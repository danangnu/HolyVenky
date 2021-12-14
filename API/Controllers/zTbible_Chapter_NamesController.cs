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
    public class zTbible_Chapter_NamesController : BaseApiController
    {
        private readonly IZtbiblechapternamesRepository _iztbiblechapternamesRepository;
        public zTbible_Chapter_NamesController(IZtbiblechapternamesRepository iztbiblechapternamesRepository)
        {
            _iztbiblechapternamesRepository = iztbiblechapternamesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<zTbible_Chapter_Names>>> GetzTbible_Chapter_Namess([FromQuery]UserParams userParams)
        {
            var ztbible_chapter_names = await _iztbiblechapternamesRepository.GetBChapterAsync(userParams);

            if (ztbible_chapter_names.Count<=0) {
                return BadRequest("Data Not Found");
            }

            Response.AddPaginationHeader(ztbible_chapter_names.CurrentPage, ztbible_chapter_names.PageSize, ztbible_chapter_names.TotalCount, ztbible_chapter_names.TotalPages);

            return Ok(ztbible_chapter_names);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<zTbible_Chapter_Names>> GetzTbible_Chapter_Names(int id)
        {
            return await _iztbiblechapternamesRepository.GetBChapterByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBChapter(zTbible_Chapter_NamesDto ztbible_chapter_namesDto, int id)
        {
            var ztbible_chapter_name = await _iztbiblechapternamesRepository.GetBChapterByIdAsync(id);

            ztbible_chapter_name.Field2 = ztbible_chapter_namesDto.Field2;

            _iztbiblechapternamesRepository.Update(ztbible_chapter_name);

            if (await _iztbiblechapternamesRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update hadiths");
        }
    }
}