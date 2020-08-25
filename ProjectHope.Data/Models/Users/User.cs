using AspNetCore.Identity.Mongo.Model;

namespace ProjectHope.Data.Models.Users
{
  public class User : MongoUser
  {
    public string Name { get; set; }
  }
}