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
    public class Ztgita_FullController : BaseApiController
    {
        private readonly IZtgitafullRepository _iztgitafullRepository;
        public Ztgita_FullController(IZtgitafullRepository iztgitafullRepository)
        {
            _iztgitafullRepository = iztgitafullRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Ztgita_Full>>> GetZtgita_Fulls([FromQuery]UserParams userParams)
        {
            var ztgita_full = await _iztgitafullRepository.GetBhaktivedantaAsync(userParams);

            if (ztgita_full.Count<=0) {
                return BadRequest("Data Not Found");
            }

            Response.AddPaginationHeader(ztgita_full.CurrentPage, ztgita_full.PageSize, ztgita_full.TotalCount, ztgita_full.TotalPages);

            return Ok(ztgita_full);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Ztgita_Full>> GetZtgita_Full(int id)
        {
            return await _iztgitafullRepository.GetBhaktivedantaByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePurohit(Ztgita_FullDto ztgita_FullDto, int id)
        {
            var ztgitafull = await _iztgitafullRepository.GetBhaktivedantaByIdAsync(id);

            ztgitafull.Ref = ztgita_FullDto.Ref;
            ztgitafull.Verse = ztgita_FullDto.Verse;
            ztgitafull.Verse_Length = ztgita_FullDto.Verse_Length;
            ztgitafull.Readers_Comments = ztgita_FullDto.Readers_Comments;
            ztgitafull.Field1 = ztgita_FullDto.Field1;

            _iztgitafullRepository.Update(ztgitafull);

            if (await _iztgitafullRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update hadiths");
        }
    }
}