using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
  public class SChapterController : BaseApiController
    {
        private readonly DataContext _context;
        public SChapterController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("AddNew")]
        public async Task<ActionResult<Tsggs_chapter___pages>> AddNew(Tsggs_chapter___pagesDto tsggs_chapter___pagesDto)
        {
            var Tsggs_chapter___page  = new Tsggs_chapter___pages
            {
                Order_in_SGGS = tsggs_chapter___pagesDto.Order_in_SGGS,
                Chapter___ragas = tsggs_chapter___pagesDto.Chapter___ragas,
                Page_Range = tsggs_chapter___pagesDto.Page_Range,
                Page_Count = tsggs_chapter___pagesDto.Page_Count,
                Gurumkhi = tsggs_chapter___pagesDto.Gurumkhi
            };

            _context.Tsggs_chapter___pages.Add(Tsggs_chapter___page);
            await _context.SaveChangesAsync();

            return Tsggs_chapter___page;
        }
    }
}