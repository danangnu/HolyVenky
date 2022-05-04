using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
  public class BibleController : BaseApiController
    {
        private readonly DataContext _context;
        public BibleController(DataContext context)
        {
            _context = context;

        }
        
        [HttpPost("AddNew")]
        public async Task<ActionResult<TBible>> AddNew(TBibleDto tBibleDto)
        {
            var tBibles = new TBible
            {
                BookTitle = tBibleDto.BookTitle,
                REf = tBibleDto.REf,
                TextData = tBibleDto.TextData,
                Verse_Length = tBibleDto.Verse_Length,
                Gita = tBibleDto.Gita,
                Quran = tBibleDto.Quran,
                SSGSahib = tBibleDto.SSGSahib,
                MBs_version = tBibleDto.MBs_version,
                Readers_comment = tBibleDto.Readers_comment,
                BTags = tBibleDto.BTags
            };

            _context.tBible.Add(tBibles);
            await _context.SaveChangesAsync();

            return tBibles;
        }
    }
}