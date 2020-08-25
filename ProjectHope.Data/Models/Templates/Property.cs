using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using ValueType = ProjectHope.Data.Types.ValueType;

namespace ProjectHope.Data.Models.Templates
{
  public class Property : Base
  {
    [BsonRepresentation(BsonType.String)]
    public ValueType ValueType { get; set; }
  }
}
