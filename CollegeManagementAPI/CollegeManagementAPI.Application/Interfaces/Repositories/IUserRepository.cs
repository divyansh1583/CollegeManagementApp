using CollegeManagementAPI.Application.DTOs;
using CollegeManagementAPI.Domain.Entities;
using CollegeManagementAPI.Domain.Common_Models;

namespace CollegeManagementAPI.Application.Interfaces.Repositories
{
    public interface IUserRepository
    {
        Task<ResponseModel> GetUsersAsync();
        Task<ResponseModel> InsertUserAndLoginCredentials(UserDetail userDetail);
        Task<ResponseModel> GetUserByEmailAsync(LoginDetails loginDetails);
        Task<ResponseModel> UpdateUserAsync(UserDetail userDetail);
        Task<ResponseModel> DeleteUserAsync(int id);
    }
}