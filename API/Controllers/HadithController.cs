using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
    public class HadithController : BaseApiController
    {
        private readonly DataContext _context;
        public HadithController(DataContext context)
        {
            _context = context;

        }

        [HttpPost("AddNew")]
        public async Task<ActionResult<Hadiths>> AddNew(HadithsDto hadithsDto)
        {
            var hadith = new Hadiths
            {
                Field2 = hadithsDto.Field2,
                Field1 = hadithsDto.Field1
            };

            _context.Hadiths.Add(hadith);
            await _context.SaveChangesAsync();

            return hadith;
        }
    }
}