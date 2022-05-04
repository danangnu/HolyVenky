using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
  public class BChapterController : BaseApiController
    {
        private readonly DataContext _context;
        public BChapterController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("AddNew")]
        public async Task<ActionResult<zTbible_Chapter_Names>> AddNew(zTbible_Chapter_NamesDto zTbible_Chapter_NamesDto)
        {
            var zTbible_Chapter_Name  = new zTbible_Chapter_Names
            {
                Field2 = zTbible_Chapter_NamesDto.Field2,
            };

            _context.zTbible_Chapter_Names.Add(zTbible_Chapter_Name);
            await _context.SaveChangesAsync();

            return zTbible_Chapter_Name;
        }
    }
}