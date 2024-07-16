using CollegeManagementAPI.Application.DTOs;
using CollegeManagementAPI.Application.Interfaces.Services;
using CollegeManagementAPI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;
using CollegeManagementAPI.Domain.Common_Models;

namespace CollegeManagementAPI.net.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("users")]
        public async Task<IActionResult> GetUsers()
        {
            var response = new ResponseModel
            {
                StatusCode = 200,
                Data = await _userService.GetUsersAsync(),
                Message = "Users retrieved successfully"
            };
            return Ok(response);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginAsync(LoginDetails loginDetails)
        {
            var user = await _userService.LoginUserAsync(loginDetails);
            if (user == null || user.Password != loginDetails.Password)
            {
                var errorResponse = new ResponseModel
                {
                    StatusCode = 500,
                    Data = null,
                    Message = "Invalid Email or Password!"
                };
                return Ok(errorResponse);
            }

            var token = _userService.GenerateToken(loginDetails);
            var response = new ResponseModel
            {
                StatusCode = 200,
                Data = new { Token = token, User = user },
                Message = "Login successful"
            };
            return Ok(response);
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserDetail userDetail)
        {
            if (!ModelState.IsValid)
            {
                var response = new ResponseModel
                {
                    StatusCode = 400,
                    Data = null,
                    Message = "Invalid request"
                };
                return BadRequest(response);
            }

            var result = await _userService.RegisterUser(userDetail);
            if (result > 0)
            {
                var response = new ResponseModel
                {
                    StatusCode = 200,
                    Data = null,
                    Message = "User registered successfully"
                };
                return Ok(response);

            }

            var errorResponse = new ResponseModel
            {
                StatusCode = 500,
                Data = null,
                Message = "An error occurred while registering the user."
            };
            return StatusCode(500, errorResponse);
        }

        [HttpPut("update")]
        public async Task<IActionResult> Update(UserDetail userDetail)
        {
            if (!ModelState.IsValid)
            {
                var response = new ResponseModel
                {
                    StatusCode = 400,
                    Data = null,
                    Message = "Invalid request"
                };
                return BadRequest(response);
            }

            var result = await _userService.UpdateUser(userDetail);
            if (result > 0)
            {
                var response = new ResponseModel
                {
                    StatusCode = 200,
                    Data = null,
                    Message = "User updated successfully"
                };
                return Ok(response);
            }

            var errorResponse = new ResponseModel
            {
                StatusCode = 500,
                Data = null,
                Message = "An error occurred while updating the user."
            };
            return StatusCode(500, errorResponse);
        }

        [HttpDelete("delete")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _userService.DeleteUser(id);
            if (result > 0)
            {
                var response = new ResponseModel
                {
                    StatusCode = 200,
                    Data = null,
                    Message = "User deleted successfully"
                };
                return Ok(response);
            }

            var errorResponse = new ResponseModel
            {
                StatusCode = 500,
                Data = null,
                Message = "An error occurred while deleting the user."
            };
            return StatusCode(500, errorResponse);
        }
    }
}