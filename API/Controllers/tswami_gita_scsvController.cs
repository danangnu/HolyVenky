using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class tswami_gita_scsvController : BaseApiController
    {
        private readonly ITswamigitascsvRepository _itswamigitascsvRepository;
        public tswami_gita_scsvController(ITswamigitascsvRepository itswamigitascsvRepository)
        {
            _itswamigitascsvRepository = itswamigitascsvRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<tswami_gita_scsv>>> Gettswami_gita_scsvs([FromQuery]UserParams userParams)
        {
            var tswami_gita_scsv = await _itswamigitascsvRepository.GetPurohitAsync(userParams);

            Response.AddPaginationHeader(tswami_gita_scsv.CurrentPage, tswami_gita_scsv.PageSize, tswami_gita_scsv.TotalCount, tswami_gita_scsv.TotalPages);

            return Ok(tswami_gita_scsv);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<tswami_gita_scsv>> Gettswami_gita_scsv(int id)
        {
            return await _itswamigitascsvRepository.GetPurohitByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePurohit(tswami_gita_scsvDto tswami_gita_scsvDto, int id)
        {
            var tswamigitascsv = await _itswamigitascsvRepository.GetPurohitByIdAsync(id);

            tswamigitascsv.VERSE = tswami_gita_scsvDto.VERSE;
            tswamigitascsv.COMMENT = tswami_gita_scsvDto.COMMENT;
            tswamigitascsv.Chapter = tswami_gita_scsvDto.Chapter;
            tswamigitascsv.IGS = tswami_gita_scsvDto.IGS;
            tswamigitascsv.NUMBER = tswami_gita_scsvDto.NUMBER;
            tswamigitascsv.TRANSLITERATION = tswami_gita_scsvDto.TRANSLITERATION;
            tswamigitascsv.Gita = tswami_gita_scsvDto.Gita;
            tswamigitascsv.Bible_Link = tswami_gita_scsvDto.Bible_Link;
            tswamigitascsv.Quran = tswami_gita_scsvDto.Quran;
            tswamigitascsv.SSGSahib = tswami_gita_scsvDto.SSGSahib;
            tswamigitascsv.MBVersion = tswami_gita_scsvDto.MBVersion;
            tswamigitascsv.readers_Comments = tswami_gita_scsvDto.readers_Comments;

            _itswamigitascsvRepository.Update(tswamigitascsv);

            if (await _itswamigitascsvRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update hadiths");
        }
    }
}