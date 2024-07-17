using CollegeManagementAPI.Application.Interfaces.Services;
using CollegeManagementAPI.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

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
        return Ok(await _userService.GetUsersAsync());
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginAsync(LoginDetails loginDetails)
    {
        return Ok(await _userService.LoginUserAsync(loginDetails));
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(UserDetail userDetail)
    {
        return Ok(await _userService.RegisterUser(userDetail));
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update(UserDetail userDetail)
    {
        return Ok(await _userService.UpdateUser(userDetail));
    }

    [HttpDelete("delete")]
    public async Task<IActionResult> Delete(int id)
    {
        return Ok(await _userService.DeleteUser(id));
    }
}