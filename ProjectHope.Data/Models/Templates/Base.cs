using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectHope.Data.Models.Templates
{
  [BsonKnownTypes(
    typeof(Template),
    typeof(Element),
    typeof(Property)
  )]
  public abstract class Base : IEquatable<Base>
  {
    [BsonRequired]
    public string Name { get; set; }

    [BsonIgnoreIfNull]
    public string Description { get; set; }

    #region Methods

    public override bool Equals(object other) => Equals(other as Base);

    public bool Equals(Base other)
    {
      if (other == null) return false;
      if (this == other) return true;

      return this.GetHashCode() == other.GetHashCode();
    }

    public override int GetHashCode()
    {
      return (Name, Description).GetHashCode();
    }

    #endregion
  }
}
