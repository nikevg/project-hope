using System.ComponentModel.DataAnnotations;
using ProjectHope.Data.Types;

namespace ProjectHope.Services.Dtos.Templates
{
  public class PropertyDto : BaseDto
  {
    [Required]
    public ValueType ValueType { get; set; }
  }
}