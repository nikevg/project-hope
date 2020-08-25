using System.Collections.Generic;

namespace ProjectHope.Services.Dtos.Templates
{
  public class ElementDto : BaseDto
  {
    public IEnumerable<PropertyDto> Properties { get; set; }
  }
}