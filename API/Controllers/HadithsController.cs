using System.Collections.Generic;
using System.Linq;
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
    public class HadithsController : BaseApiController
    {
        private readonly IHadithsRepository _hadithsRepository;
        public HadithsController(IHadithsRepository hadithsRepository)
        {
            _hadithsRepository = hadithsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Hadiths>>> GetHadithss([FromQuery]UserParams userParams)
        {
           var hadiths = await _hadithsRepository.GetHadithsAsync(userParams);

           if (hadiths.Count<=0) {
                return BadRequest("Data Not Found");
            }

            Response.AddPaginationHeader(hadiths.CurrentPage, hadiths.PageSize, hadiths.TotalCount, hadiths.TotalPages);

            return Ok(hadiths);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Hadiths>> GetHadiths(int id)
        {
            return await _hadithsRepository.GetHadithsByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateHadiths(HadithsDto hadithsDto, int id)
        {
            var hadith = await _hadithsRepository.GetHadithsByIdAsync(id);

            hadith.Field2 = hadithsDto.Field2;
            hadith.Field1 = hadithsDto.Field1;

            _hadithsRepository.Update(hadith);

            if (await _hadithsRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update hadiths");
        }
    }
}