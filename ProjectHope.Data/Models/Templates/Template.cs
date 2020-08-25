using System;
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ProjectHope.Data.Models.Templates
{
  public class Template : Base
  {
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string Id { get; set; }

    public DateTime? Updated { get; set; }

    [BsonIgnoreIfNull]
    public IEnumerable<Element> Elements { get; set; }

    [BsonIgnoreIfNull]
    public IEnumerable<Property> Properties { get; set; }
  }
}
