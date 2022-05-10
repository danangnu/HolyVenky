using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class ytquranController : BaseApiController
    {
        private readonly IYtquranRepository _iytquranRepository;
        public ytquranController(IYtquranRepository iytquranRepository)
        {
            _iytquranRepository = iytquranRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<ytquran>>> Getytqurans([FromQuery]UserParams userParams)
        {
            var qurans = await _iytquranRepository.GetQuranAsync(userParams);

            if (qurans.Count<=0) {
                return BadRequest("Data Not Found");
            }

            Response.AddPaginationHeader(qurans.CurrentPage, qurans.PageSize, qurans.TotalCount, qurans.TotalPages);

            return Ok(qurans);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<ytquran>> Getytquran(int id)
        {
            return await _iytquranRepository.GetQuranByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateQuran(ytquranDto ytquranDto, int id)
        {
            var ytquran = await _iytquranRepository.GetQuranByIdAsync(id);

            if (ytquranDto.ChaperNVerse != null)
                ytquran.ChaperNVerse = ytquranDto.ChaperNVerse;
            ytquran.Verse = ytquranDto.Verse;
            ytquran.Sura = ytquranDto.Sura;
            ytquran.Location = ytquranDto.Location;
            ytquran.OrderRevealed = ytquranDto.OrderRevealed;
            ytquran.Gita_Link = ytquranDto.Gita_Link;
            ytquran.Bible_Link = ytquranDto.Bible_Link;
            ytquran.Commentary = ytquranDto.Commentary;
            ytquran.MB_s_Version = ytquranDto.MB_s_Version;
            ytquran.Number = ytquranDto.Number;
            ytquran.VLen = ytquranDto.VLen;
            ytquran.IDs = ytquranDto.IDs;
            ytquran.truncated_ = ytquranDto.truncated_;

            _iytquranRepository.Update(ytquran);

            if (await _iytquranRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update hadiths");
        }
    }
}