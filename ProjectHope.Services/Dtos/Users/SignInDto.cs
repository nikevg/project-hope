using System.ComponentModel.DataAnnotations;

namespace ProjectHope.Services.Dtos.Users
{
  public class SignInDto
  {
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }
  }
}