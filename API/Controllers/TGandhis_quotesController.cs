using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class TGandhis_quotesController : BaseApiController
    {
        private readonly ITgandhisquotesRepository _itgandhisquotesRepository;
        public TGandhis_quotesController(ITgandhisquotesRepository itgandhisquotesRepository)
        {
            _itgandhisquotesRepository = itgandhisquotesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TGandhis_quotes>>> GetTGandhis_quotess([FromQuery]UserParams userParams)
        {
            var tgandhis_quotes = await _itgandhisquotesRepository.GetGandhiAsync(userParams);

            Response.AddPaginationHeader(tgandhis_quotes.CurrentPage, tgandhis_quotes.PageSize, tgandhis_quotes.TotalCount, tgandhis_quotes.TotalPages);

            return Ok(tgandhis_quotes);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TGandhis_quotes>> GetTGandhis_quotes(int id)
        {
            return await _itgandhisquotesRepository.GetGandhiByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateGandhi(TGandhis_quotesDto tgandhis_quotesDto, int id)
        {
            var tgandhis_quote = await _itgandhisquotesRepository.GetGandhiByIdAsync(id);

            tgandhis_quote.Field1 = tgandhis_quotesDto.Field1;

            _itgandhisquotesRepository.Update(tgandhis_quote);

            if (await _itgandhisquotesRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update hadiths");
        }
    }
}