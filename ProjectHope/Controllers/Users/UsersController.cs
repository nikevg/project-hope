using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectHope.Data.Models;
using ProjectHope.Services.Dtos.Users;
using ProjectHope.Services.Users;

namespace ProjectHope.Controllers.Users
{
  public class UsersController : Controller
  {
    private readonly IUsersService _service;

    public UsersController(IUsersService service)
    {
      _service = service;
    }

    [HttpPost("signup")]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result<string>>> SignUpAsync([FromBody] SignUpDto item)
    {
      try
      {
        var res = await _service.SignUpAsync(item);

        return StatusCode(201, res);
      }
      catch (ArgumentException)
      {
        return BadRequest();
      }
    }

    [HttpPost("signin")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result<string>>> SignInAsync([FromBody] SignInDto item)
    {
      try
      {
        var res = await _service.SignInAsync(item);

        return Ok(res);
      }
      catch (ArgumentException)
      {
        return BadRequest();
      }
    }

    [HttpGet("check/{email}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result<bool>>> CheckAsync(string email)
    {
      try
      {
        var res = await _service.CheckAsync(email);

        return Ok(res);
      }
      catch (ArgumentNullException)
      {
        return BadRequest();
      }
    }
  }
}