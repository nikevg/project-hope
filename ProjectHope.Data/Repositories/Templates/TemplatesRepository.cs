using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using MongoDB.Driver;
using ProjectHope.Data.Models;
using ProjectHope.Data.Models.Templates;
using ProjectHope.Data.Settings;

namespace ProjectHope.Data.Repositories.Templates
{
  public class TemplatesRepository : ITemplatesRepository
  {
    private readonly IMongoCollection<Template> _items;

    public TemplatesRepository(IDatabaseSettings settings)
    {
      var client = new MongoClient(settings.ConnectionString);
      var database = client.GetDatabase(settings.DatabaseName);

      var name = nameof(TemplatesRepository);

      _items = database.GetCollection<Template>(name.Remove(name.IndexOf("Repository")));
    }

    public async Task<Result<Template>> CreateAsync(Template item)
    {
      if (item == null)
      {
        throw new ArgumentNullException(nameof(item));
      }

      item.Updated = DateTime.UtcNow;

      await _items.InsertOneAsync(item);

      return new Result<Template>
      {
        Count = 1,
        Data = item
      };
    }

    public async Task<Result<IEnumerable<Template>>> ReadAsync(int skip, int take, string filter = null)
    {
      var query = _items.Find(f => true);

      if (!string.IsNullOrEmpty(filter))
      {
        query = _items.Find(f => f.Name.Trim().ToLower().Contains(filter) || f.Description.Trim().ToLower().Contains(filter));
      }

      return new Result<IEnumerable<Template>>
      {
        Count = await query.CountDocumentsAsync(),
        Data = await query
          .SortByDescending(s => s.Updated)
          .Skip(skip).Limit(take)
          .ToListAsync()
      };
    }

    public async Task<Result<Template>> ReadAsync(string id)
    {
      if (string.IsNullOrEmpty(id))
      {
        throw new ArgumentNullException(nameof(id));
      }

      var item = await _items.Find(f => f.Id == id).FirstOrDefaultAsync();

      return new Result<Template>
      {
        Count = item != null ? 1 : 0,
        Data = item
      };
    }

    public async Task<Result<Template>> UpdateAsync(Template item)
    {
      if (item == null)
      {
        throw new ArgumentNullException(nameof(item));
      }

      if (string.IsNullOrEmpty(item.Id))
      {
        throw new ArgumentNullException(nameof(Template.Id));
      }

      item.Updated = DateTime.UtcNow;

      await _items.ReplaceOneAsync(f => f.Id == item.Id, item);

      return new Result<Template>
      {
        Count = 1,
        Data = item
      };
    }

    public async Task DeleteAsync(string id)
    {
      if (string.IsNullOrEmpty(id))
      {
        throw new ArgumentNullException(nameof(id));
      }

      await _items.DeleteOneAsync(f => f.Id == id);
    }
  }
}