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
    public class Tsggs_chapter___pagesController : BaseApiController
    {
        private readonly ITsggschapterpagesRepository _itsggschapterpagesRepository;
        public Tsggs_chapter___pagesController(ITsggschapterpagesRepository itsggschapterpagesRepository)
        {
            _itsggschapterpagesRepository = itsggschapterpagesRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Tsggs_chapter___pages>>> GetTsggs_chapter___pagess([FromQuery]UserParams userParams)
        {
            var tsggs_chapter___pages = await _itsggschapterpagesRepository.GetSChapterAsync(userParams);

            if (tsggs_chapter___pages.Count<=0) {
                return BadRequest("Data Not Found");
            }

            Response.AddPaginationHeader(tsggs_chapter___pages.CurrentPage, tsggs_chapter___pages.PageSize, tsggs_chapter___pages.TotalCount, tsggs_chapter___pages.TotalPages);

            return Ok(tsggs_chapter___pages);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Tsggs_chapter___pages>> GetTsggs_chapter___pages(int id)
        {
            return await _itsggschapterpagesRepository.GetSChapterByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateBChapter(Tsggs_chapter___pagesDto tsggs_Chapter___PagesDto, int id)
        {
            var tsggs_chapter___page = await _itsggschapterpagesRepository.GetSChapterByIdAsync(id);

            tsggs_chapter___page.Order_in_SGGS = tsggs_Chapter___PagesDto.Order_in_SGGS;
            tsggs_chapter___page.Chapter___ragas = tsggs_Chapter___PagesDto.Chapter___ragas;
            tsggs_chapter___page.Page_Range = tsggs_Chapter___PagesDto.Page_Range;
            tsggs_chapter___page.Page_Count = tsggs_Chapter___PagesDto.Page_Count;
            tsggs_chapter___page.Gurumkhi = tsggs_Chapter___PagesDto.Gurumkhi;

            _itsggschapterpagesRepository.Update(tsggs_chapter___page);

            if (await _itsggschapterpagesRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update hadiths");
        }
    }
}