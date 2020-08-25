using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ProjectHope.Services.Templates;
using ProjectHope.Data.Models;
using ProjectHope.Services.Dtos.Templates;
using Microsoft.AspNetCore.Authorization;

namespace ProjectHope.Controllers.Templates
{
  public class TemplatesController : Controller
  {
    private readonly ITemplatesService _service;

    public TemplatesController(ITemplatesService service)
    {
      _service = service;
    }

    [HttpGet]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<ActionResult<Result<IEnumerable<TemplateDto>>>> GetAsync(int skip, int take, string filter = null)
    {
      var res = await _service.ReadAsync(skip, take, filter);

      return Ok(res);
    }

    [HttpGet("{id:length(24)}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<Result<TemplateFullDto>>> GetAsync(string id)
    {
      try
      {
        var res = await _service.ReadAsync(id);

        if (res.Count == 0)
        {
          return NotFound();
        }

        return Ok(res);
      }
      catch (ArgumentNullException)
      {
        return BadRequest();
      }
    }

    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result<TemplateFullDto>>> CreateAsync([FromBody] TemplateFullDto item)
    {
      try
      {
        var res = await _service.CreateAsync(item);

        return StatusCode(201, res);
      }
      catch (ArgumentNullException)
      {
        return BadRequest();
      }
    }

    [HttpPut]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<Result<TemplateFullDto>>> UpdateAsync([FromBody] TemplateFullDto item)
    {
      try
      {
        var res = await _service.UpdateAsync(item);

        return Ok(res);
      }
      catch (ArgumentNullException)
      {
        return BadRequest();
      }
    }

    [HttpDelete("{id:length(24)}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult> DeleteAsync(string id)
    {
      try
      {
        await _service.DeleteAsync(id);
      }
      catch (ArgumentNullException)
      {
        return BadRequest();
      }

      return NoContent();
    }
  }
}