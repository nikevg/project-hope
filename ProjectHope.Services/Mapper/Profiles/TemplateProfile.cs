using AutoMapper;
using ProjectHope.Data.Models.Templates;
using ProjectHope.Services.Dtos.Templates;

namespace ProjectHope.Services.Mapper.Profiles
{
  public class TemplateProfile : Profile
  {
    public TemplateProfile()
    {
      CreateMap<Template, TemplateDto>();

      CreateMap<Template, TemplateFullDto>();
      CreateMap<TemplateFullDto, Template>();

      CreateMap<Property, PropertyDto>();
      CreateMap<PropertyDto, Property>();

      CreateMap<Element, ElementDto>();
      CreateMap<ElementDto, Element>();
    }
  }
}