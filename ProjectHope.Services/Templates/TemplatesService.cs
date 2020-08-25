using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ProjectHope.Data.Models;
using ProjectHope.Data.Models.Templates;
using ProjectHope.Data.Repositories.Templates;
using ProjectHope.Services.Dtos.Templates;

namespace ProjectHope.Services.Templates
{
  public class TemplatesService : ITemplatesService
  {
    private readonly ITemplatesRepository _repository;
    private readonly IMapper _mapper;

    public TemplatesService(ITemplatesRepository repository, IMapper mapper)
    {
      _repository = repository;
      _mapper = mapper;
    }

    public async Task<Result<TemplateFullDto>> CreateAsync(TemplateFullDto item)
    {
      var template = _mapper.Map<Template>(item);

      var res = await _repository.CreateAsync(template);

      return MapResult<TemplateFullDto, Template>(res);
    }

    public async Task<Result<IEnumerable<TemplateDto>>> ReadAsync(int skip, int take, string filter = null)
    {
      var res = await _repository.ReadAsync(skip, take, filter);

      return MapResult<IEnumerable<TemplateDto>, IEnumerable<Template>>(res);
    }

    public async Task<Result<TemplateFullDto>> ReadAsync(string id)
    {
      var res = await _repository.ReadAsync(id);

      return MapResult<TemplateFullDto, Template>(res);
    }

    public async Task<Result<TemplateFullDto>> UpdateAsync(TemplateFullDto item)
    {
      var template = _mapper.Map<Template>(item);

      var res = await _repository.UpdateAsync(template);

      return MapResult<TemplateFullDto, Template>(res);
    }

    public async Task DeleteAsync(string id)
    {
      await _repository.DeleteAsync(id);
    }

    #region private

    private Result<T> MapResult<T, U>(Result<U> result)
      where T : class
      where U : class
    {
      return new Result<T>
      {
        Count = result.Count,
        Data = result.Data != null ? _mapper.Map<T>(result.Data) : (T)null
      };
    }

    #endregion
  }
}