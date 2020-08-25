using System.Collections.Generic;

namespace ProjectHope.Services.Dtos.Templates
{
  public class TemplateFullDto : TemplateDto
  {
    public IEnumerable<ElementDto> Elements { get; set; }

    public IEnumerable<PropertyDto> Properties { get; set; }
  }
}