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
    public async Task<IActionResult> LoginAsync([FromBody] LoginDetails loginDetails)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(await _userService.LoginUserAsync(loginDetails));
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserDetail userDetail)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(await _userService.RegisterUser(userDetail));
    }

    [HttpPut("update")]
    public async Task<IActionResult> Update([FromBody] UserDetail userDetail)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(await _userService.UpdateUser(userDetail));
    }

    [HttpDelete("delete/{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        if (!ModelState.IsValid)
        {
            return BadRequest(ModelState);
        }
        return Ok(await _userService.DeleteUser(id));
    }
}