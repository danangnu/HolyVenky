using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
    public class PurohitController : BaseApiController
    {
        private readonly DataContext _context;
        public PurohitController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("AddNew")]
        public async Task<ActionResult<tswami_gita_scsv>> AddNew(tswami_gita_scsvDto tswami_gita_scsvDto)
        {
            var tswami_gita_scsv1  = new tswami_gita_scsv
            {
                VERSE = tswami_gita_scsvDto.VERSE,
                COMMENT = tswami_gita_scsvDto.COMMENT,
                Chapter = tswami_gita_scsvDto.Chapter,
                IGS = tswami_gita_scsvDto.IGS,
                NUMBER = tswami_gita_scsvDto.NUMBER,
                TRANSLITERATION = tswami_gita_scsvDto.TRANSLITERATION,
                Gita = tswami_gita_scsvDto.Gita,
                Bible_Link = tswami_gita_scsvDto.Bible_Link,
                Quran = tswami_gita_scsvDto.Quran,
                SSGSahib = tswami_gita_scsvDto.SSGSahib,
                MBVersion = tswami_gita_scsvDto.MBVersion,
                readers_Comments = tswami_gita_scsvDto.readers_Comments
            };

            _context.tswami_gita_scsv.Add(tswami_gita_scsv1);
            await _context.SaveChangesAsync();

            return tswami_gita_scsv1;
        }

        [HttpGet]
        public int GetMaxID()
        {
            return _context.tswami_gita_scsv.Max(t => t.ID);
        }
    }
}