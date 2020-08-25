using System.Collections.Generic;
using System.Threading.Tasks;
using ProjectHope.Data.Models;
using ProjectHope.Services.Dtos.Templates;

namespace ProjectHope.Services.Templates
{
  public interface ITemplatesService
  {
    Task<Result<TemplateFullDto>> CreateAsync(TemplateFullDto item);

    Task<Result<IEnumerable<TemplateDto>>> ReadAsync(int skip, int take, string filter = null);

    Task<Result<TemplateFullDto>> ReadAsync(string id);

    Task<Result<TemplateFullDto>> UpdateAsync(TemplateFullDto item);

    Task DeleteAsync(string id);
  }
}