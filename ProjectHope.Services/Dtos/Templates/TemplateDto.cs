using System;

namespace ProjectHope.Services.Dtos.Templates
{
  public class TemplateDto : BaseDto
  {
    public string Id { get; set; }

    public DateTime? Updated { get; set; }
  }
}