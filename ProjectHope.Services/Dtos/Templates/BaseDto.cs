using System.ComponentModel.DataAnnotations;

namespace ProjectHope.Services.Dtos.Templates
{
  public abstract class BaseDto : IDto
  {
    [Required]
    public string Name { get; set; }

    public string Description { get; set; }
  }
}