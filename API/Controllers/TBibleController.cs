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
    public class TBibleController : BaseApiController
    {
        private readonly ITBibleRepository _bibleRepository;
        public TBibleController(ITBibleRepository bibleRepository)
        {
            _bibleRepository = bibleRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<TBible>>> GetTBibles([FromQuery]UserParams userParams)
        {
            var bibles = await _bibleRepository.GetTBiblesAsync(userParams);
            
            if (bibles.Count<=0) {
                return BadRequest("Data Not Found");
            }

            Response.AddPaginationHeader(bibles.CurrentPage, bibles.PageSize, bibles.TotalCount, bibles.TotalPages);

            return Ok(bibles);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<TBible>> GetTBible(int id)
        {
            return await _bibleRepository.GetTBibleByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBible(TBibleDto tBibleDto, int id)
        {
            var tbible1 = await _bibleRepository.GetTBibleByIdAsync(id);

            tbible1.BookTitle = tBibleDto.BookTitle;
            tbible1.REf = tBibleDto.REf;
            tbible1.TextData = tBibleDto.TextData;
            tbible1.Verse_Length = tBibleDto.Verse_Length;
            tbible1.Gita = tBibleDto.Gita;
            tbible1.Quran = tBibleDto.Quran;
            tbible1.SSGSahib = tBibleDto.SSGSahib;
            tbible1.MBs_version = tBibleDto.MBs_version;
            tbible1.Readers_comment = tBibleDto.Readers_comment;
            tbible1.BTags = tBibleDto.BTags;

            _bibleRepository.Update(tbible1);

            if (await _bibleRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update table Bible");
        }
    }
}