using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  public class BhaktivedantaController : BaseApiController
    {
        private readonly DataContext _context;
        public BhaktivedantaController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("AddNew")]
        public async Task<ActionResult<Ztgita_Full>> AddNew(Ztgita_FullDto ztgita_FullDto)
        {
            var Ztgita_Full1  = new Ztgita_Full
            {
                Ref = ztgita_FullDto.Ref,
                Verse = ztgita_FullDto.Verse,
                Verse_Length = ztgita_FullDto.Verse_Length,
                Readers_Comments = ztgita_FullDto.Readers_Comments,
                Field1 = ztgita_FullDto.Field1
            };

            _context.Ztgita_Full.Add(Ztgita_Full1);
            await _context.SaveChangesAsync();

            return Ztgita_Full1;
        }
    }
}