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
    public class SggsController : BaseApiController
    {
        private readonly ISggsRepository _isggsRepository;
        public SggsController(ISggsRepository isggsRepository)
        {
            _isggsRepository = isggsRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<tblsggs>>> GetTblsggs([FromQuery]UserParams userParams)
        {
            var sggs = await _isggsRepository.GetSggsAsync(userParams);
            
            if (sggs.Count<=0) {
                return BadRequest("Data Not Found");
            }

            Response.AddPaginationHeader(sggs.CurrentPage, sggs.PageSize, sggs.TotalCount, sggs.TotalPages);

            return Ok(sggs);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<tblsggs>> GetTblsggs(int id)
        {
            return await _isggsRepository.GetSggsByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBible(tblsggsDto sggsDto, int id)
        {
            var tsggs = await _isggsRepository.GetSggsByIdAsync(id);

            tsggs.BookTitle = sggsDto.BookTitle;
            tsggs.REf = sggsDto.REf;
            tsggs.TextData = sggsDto.TextData;
            tsggs.Verse_Length = sggsDto.Verse_Length;
            tsggs.Gita = sggsDto.Gita;
            tsggs.Quran = sggsDto.Quran;
            tsggs.Bible = sggsDto.Bible;
            tsggs.MBs_version = sggsDto.MBs_version;
            tsggs.Readers_comment = sggsDto.Readers_comment;
            tsggs.BTags = sggsDto.BTags;

            _isggsRepository.Update(tsggs);

            if (await _isggsRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update table sggs");
        }
    }
}