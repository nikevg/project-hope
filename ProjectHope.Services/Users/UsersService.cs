using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using ProjectHope.Data.Models;
using ProjectHope.Data.Models.Users;
using ProjectHope.Services.Dtos.Users;
using ProjectHope.Services.Settings;

namespace ProjectHope.Services.Users
{
  public class UsersService : IUsersService
  {
    private readonly UserManager<User> _userManager;
    private readonly SignInManager<User> _signInManager;
    private readonly IConfiguration _configuration;

    public UsersService(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
    {
      _userManager = userManager;
      _signInManager = signInManager;
      _configuration = configuration;
    }

    public async Task<User> ReadAsync(string name)
    {
      if (string.IsNullOrEmpty(name))
      {
        throw new ArgumentNullException(nameof(name));
      }

      return await _userManager.FindByNameAsync(name);
    }

    public async Task<Result<string>> SignUpAsync(SignUpDto item)
    {
      var user = new User { Name = item.Name, UserName = item.Email, Email = item.Email };

      var result = await _userManager.CreateAsync(user, item.Password);

      if (!result.Succeeded)
      {
        throw new ArgumentException();
      }

      return await SignInAsync(new SignInDto { Email = item.Email, Password = item.Password });
    }

    public async Task<Result<string>> SignInAsync(SignInDto item)
    {
      var user = await ReadAsync(item.Email);

      if (user == null)
      {
        throw new ArgumentNullException(nameof(user));
      }

      var result = await _signInManager.PasswordSignInAsync(item.Email, item.Password, false, false);

      if (!result.Succeeded)
      {
        throw new ArgumentException();
      }

      var aSettingsSection = _configuration.GetSection(nameof(AuthenticationSettings));

      var claims = new List<Claim>
      {
        //new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        //new Claim(ClaimTypes.Name, user.Name)
      };

      var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(aSettingsSection[nameof(AuthenticationSettings.Key)]));
      var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
      var expires = DateTime.Now.AddDays(Convert.ToDouble(aSettingsSection[nameof(AuthenticationSettings.ExpireDays)]));

      var token = new JwtSecurityToken(
        aSettingsSection[nameof(AuthenticationSettings.Issuer)],
        aSettingsSection[nameof(AuthenticationSettings.Issuer)],
        claims,
        expires: expires,
        signingCredentials: creds
      );

      var tokenStr = new JwtSecurityTokenHandler().WriteToken(token);

      return new Result<string>
      {
        Count = 1,
        Data = tokenStr
      };
    }

    public async Task<Result<bool>> CheckAsync(string email)
    {
      var user = await ReadAsync(email);

      return new Result<bool>
      {
        Count = user != null ? 1 : 0,
        Data = user != null ? true : false
      };
    }
  }
}