using System.Threading.Tasks;
using ProjectHope.Data.Models;
using ProjectHope.Data.Models.Users;
using ProjectHope.Services.Dtos.Users;

namespace ProjectHope.Services.Users
{
  public interface IUsersService
  {
    Task<User> ReadAsync(string name);

    Task<Result<string>> SignUpAsync(SignUpDto item);

    Task<Result<string>> SignInAsync(SignInDto item);

    Task<Result<bool>> CheckAsync(string email);
  }
}