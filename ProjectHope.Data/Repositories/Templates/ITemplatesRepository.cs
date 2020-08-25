using System.Collections.Generic;
using System.Threading.Tasks;
using ProjectHope.Data.Models;
using ProjectHope.Data.Models.Templates;

namespace ProjectHope.Data.Repositories.Templates
{
  public interface ITemplatesRepository
  {
    Task<Result<Template>> CreateAsync(Template item);

    Task<Result<IEnumerable<Template>>> ReadAsync(int skip, int take, string filter = null);

    Task<Result<Template>> ReadAsync(string id);

    Task<Result<Template>> UpdateAsync(Template item);

    Task DeleteAsync(string id);
  }
}