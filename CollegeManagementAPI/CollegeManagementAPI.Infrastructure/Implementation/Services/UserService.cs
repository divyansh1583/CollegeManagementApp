using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using CollegeManagementAPI.Application.DTOs;
using CollegeManagementAPI.Application.Interfaces.Repositories;
using CollegeManagementAPI.Application.Interfaces.Services;
using CollegeManagementAPI.Domain.Entities;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace CollegeManagementAPI.Infrastructure.Implementation.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;

        public UserService(IUserRepository userRepository, IConfiguration configuration)
        {
            _userRepository = userRepository;
            _configuration = configuration;
        }
        //Generate Token
        public string GenerateToken(LoginDetails user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"], null,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
        //Get
        public async Task<IEnumerable<UserDetail>> GetUsersAsync()
        {

            return await _userRepository.GetUsersAsync();
        }
        //loging use if email id and 
        public async Task<LoginDetails> LoginUserAsync(LoginDetails loginDetails)
        {
            return await _userRepository.GetUserByEmailAsync(loginDetails.Email);

        }
        //Insert
        public async Task<int> RegisterUser(UserDetail userDetail)
        {

            return await _userRepository.InsertUserAndLoginCredentials(userDetail);
        }

        //Update
        public async Task<int> UpdateUser(UserDetail userDetail)
        {
            return await _userRepository.UpdateUserAsync(userDetail);

        }

        //Delete
        public async Task<int> DeleteUser(int userId)
        {
            return await _userRepository.DeleteUserAsync(userId);
        }

    }



}
