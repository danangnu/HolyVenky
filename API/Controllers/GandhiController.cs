using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
  public class GandhiController : BaseApiController
    {
        private readonly DataContext _context;
        public GandhiController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("AddNew")]
        public async Task<ActionResult<TGandhis_quotes>> AddNew(TGandhis_quotesDto tGandhis_quotesDto)
        {
            var TGandhis_quotes  = new TGandhis_quotes
            {
                Field1 = tGandhis_quotesDto.Field1
            };

            _context.TGandhis_quotes.Add(TGandhis_quotes);
            await _context.SaveChangesAsync();

            return TGandhis_quotes;
        }
    }
}