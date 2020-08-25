using System.Net.Mime;
using Microsoft.AspNetCore.Mvc;

namespace ProjectHope.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  [Consumes(MediaTypeNames.Application.Json)]
  [Produces(MediaTypeNames.Application.Json)]
  public abstract class Controller : ControllerBase
  {

  }
}