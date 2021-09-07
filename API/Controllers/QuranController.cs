using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class QuranController : BaseApiController
    {
        private readonly DataContext _context;
        public QuranController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("AddNew")]
        public async Task<ActionResult<ytquran>> AddNew(ytquranDto ytquranDto)
        {
            var ytquran1  = new ytquran
            {
                ChaperNVerse = ytquranDto.ChaperNVerse,
                Verse = ytquranDto.Verse,
                Sura = ytquranDto.Sura,
                Location = ytquranDto.Location,
                OrderRevealed = ytquranDto.OrderRevealed,
                Gita_Link = ytquranDto.Gita_Link,
                Bible_Link = ytquranDto.Bible_Link,
                Commentary = ytquranDto.Commentary,
                MB_s_Version = ytquranDto.MB_s_Version,
                Number = ytquranDto.Number,
                VLen = ytquranDto.VLen,
                IDs = ytquranDto.IDs,
                truncated_ = ytquranDto.truncated_
            };

            _context.ytquran.Add(ytquran1);
            await _context.SaveChangesAsync();

            return ytquran1;
        }
    }
}