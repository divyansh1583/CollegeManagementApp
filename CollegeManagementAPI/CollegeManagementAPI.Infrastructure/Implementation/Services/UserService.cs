using CollegeManagementAPI.Application.Interfaces.Repositories;
using CollegeManagementAPI.Application.Interfaces.Services;
using CollegeManagementAPI.Domain.Common_Models;
using CollegeManagementAPI.Domain.Entities;

public class UserService : IUserService
{
    private readonly IUserRepository _userRepository;

    public UserService(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    public async Task<ResponseModel> GetUsersAsync()
    {
        return await _userRepository.GetUsersAsync();
    }

    public async Task<ResponseModel> LoginUserAsync(LoginDetails loginDetails)
    {
        return await _userRepository.GetUserByEmailAsync(loginDetails);
    }

    public async Task<ResponseModel> RegisterUser(UserDetail userDetail)
    {
        return await _userRepository.InsertUserAndLoginCredentials(userDetail);
    }

    public async Task<ResponseModel> UpdateUser(UserDetail userDetail)
    {
        return await _userRepository.UpdateUserAsync(userDetail);
    }

    public async Task<ResponseModel> DeleteUser(int userId)
    {
        return await _userRepository.DeleteUserAsync(userId);
    }
}