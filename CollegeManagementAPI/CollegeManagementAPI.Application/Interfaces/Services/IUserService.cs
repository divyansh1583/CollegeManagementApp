using CollegeManagementAPI.Application.DTOs;
using CollegeManagementAPI.Domain.Entities;
using CollegeManagementAPI.Domain.Common_Models;

namespace CollegeManagementAPI.Application.Interfaces.Services
{
    public interface IUserService
    {
        Task<ResponseModel> GetUsersAsync();
        Task<ResponseModel> LoginUserAsync(LoginDetails loginDetails);
        Task<ResponseModel> RegisterUser(UserDetail userDetail);
        Task<ResponseModel> UpdateUser(UserDetail userDetail);
        Task<ResponseModel> DeleteUser(int userId);
    }
}