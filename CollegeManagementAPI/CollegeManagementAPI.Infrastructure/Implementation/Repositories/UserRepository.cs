using CollegeManagementAPI.Application.Interfaces.Repositories;
using CollegeManagementAPI.Application.Interfaces.Services;
using CollegeManagementAPI.Domain.Common_Models;
using CollegeManagementAPI.Domain.Entities;
using CollegeManagementAPI.Infrastructure.Data;
using CollegeManagementAPI.Infrastructure.Implementation.Services;
using Dapper;

public class UserRepository : IUserRepository
{
    private readonly DapperContext _context;
    private readonly TokenService _tokenService;

    public UserRepository(DapperContext context, TokenService tokenService)
    {
        _context = context;
        _tokenService = tokenService;
    }

    public async Task<ResponseModel> GetUsersAsync()
    {
        try
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "EXEC DC_GetUserDetails";
                var users = await connection.QueryAsync<UserDetail>(query);
                return new ResponseModel { StatusCode = 200, Data = users, Message = ResponseMessages.UsersRetrievedSuccessfully };
            }
        }
        catch (Exception ex)
        {
            return new ResponseModel { StatusCode = 500, Data = null, Message = ResponseMessages.ErrorOccurred };
        }
    }

    public async Task<ResponseModel> GetUserByEmailAsync(LoginDetails loginDetails)
    {
        try
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "SELECT * FROM DC_LoginCredentials lc WHERE Email=@Email";
                var users = await connection.QueryAsync<LoginDetails>(query, new { Email = loginDetails.Email });
                if (users.Any())
                {
                    var user = users.FirstOrDefault();
                    if (user.Password == loginDetails.Password)
                    {
                        var token = _tokenService.GenerateToken(loginDetails);
                        return new ResponseModel { StatusCode = 200, Data = new { Token = token, User = user }, Message = ResponseMessages.UserFound };
                    }
                    else
                    {
                        return new ResponseModel { StatusCode = 401, Data = null, Message = ResponseMessages.InvaildPassword };
                    }
                }
                else
                {
                    return new ResponseModel { StatusCode = 404, Data = null, Message = ResponseMessages.UserNotFound };
                }
            }
        }
        catch (Exception ex)
        {
            return new ResponseModel { StatusCode = 500, Data = null, Message = ResponseMessages.ErrorOccurred };
        }
    }

    public async Task<ResponseModel> InsertUserAndLoginCredentials(UserDetail userDetail)
    {
        try
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "EXEC DC_InsertUserAndLoginCredentials @FirstName, @LastName, @Email, @PhoneNumber, @CountryId, @StateId, @Gender, @Password";
                var parameters = new
                {
                    userDetail.FirstName,
                    userDetail.LastName,
                    userDetail.Email,
                    userDetail.PhoneNumber,
                    userDetail.CountryId,
                    userDetail.StateId,
                    userDetail.Gender,
                    userDetail.Password
                };
                var result = await connection.ExecuteAsync(query, parameters);
                if (result > 0)
                {
                    return new ResponseModel { StatusCode = 201, Data = userDetail, Message = ResponseMessages.UserCreatedSuccessfully };
                }
                else
                {
                    return new ResponseModel { StatusCode = 500, Data = null, Message = ResponseMessages.CreateError };
                }
            }
        }
        catch (Exception ex)
        {
            return new ResponseModel { StatusCode = 500, Data = null, Message = ResponseMessages.CreateError };
        }
    }

    public async Task<ResponseModel> UpdateUserAsync(UserDetail userDetail)
    {
        try
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "EXEC DC_UpdateUserAndLoginCredentials @UserId, @FirstName, @LastName, @Email, @PhoneNumber, @CountryId, @StateId, @Gender, @Password";
                var parameters = new
                {
                    userDetail.UserId,
                    userDetail.FirstName,
                    userDetail.LastName,
                    userDetail.Email,
                    userDetail.PhoneNumber,
                    userDetail.CountryId,
                    userDetail.StateId,
                    userDetail.Gender,
                    userDetail.Password
                };
                var result = await connection.ExecuteAsync(query, parameters);
                if (result > 0)
                {
                    return new ResponseModel { StatusCode = 200, Data = userDetail, Message = ResponseMessages.UserUpdatedSuccessfully };
                }
                else
                {
                    return new ResponseModel { StatusCode = 500, Data = null, Message = ResponseMessages.UpdateError };
                }
            }
        }
        catch (Exception ex)
        {
            return new ResponseModel { StatusCode = 500, Data = null, Message = ResponseMessages.UpdateError };
        }
    }

    public async Task<ResponseModel> DeleteUserAsync(int id)
    {
        try
        {
            using (var connection = _context.CreateConnection())
            {
                var query = "EXEC DC_DeleteUserAndLoginCredentials @UserId";
                var parameters = new { UserId = id };
                var result = await connection.ExecuteAsync(query, parameters);
                if (result > 0)
                {
                    return new ResponseModel { StatusCode = 200, Data = null, Message = ResponseMessages.UserDeletedSuccessfully };
                }
                else
                {
                    return new ResponseModel { StatusCode = 500, Data = null, Message = ResponseMessages.DeleteError };
                }
            }
        }
        catch (Exception ex)
        {
            return new ResponseModel { StatusCode = 500, Data = null, Message = ResponseMessages.DeleteError };
        }
    }

}