using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ProjectHope.Data.Models.Templates
{
  public class Element : Base
  {
    public IEnumerable<Property> Properties { get; set; }
  }
}
