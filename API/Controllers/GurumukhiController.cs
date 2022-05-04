using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
  public class GurumukhiController : BaseApiController
    {
        private readonly DataContext _context;
        public GurumukhiController(DataContext context)
        {
            _context = context;
        }

        [HttpPost("AddNew")]
        public async Task<ActionResult<tSGGS_Final>> AddNew(tSGGS_FinalDto tSGGS_FinalDto)
        {
            var tSGGS_Final1  = new tSGGS_Final
            {
                line_number = tSGGS_FinalDto.line_number,
                page_No = tSGGS_FinalDto.page_No,
                vERSE = tSGGS_FinalDto.vERSE,
                Field1 = tSGGS_FinalDto.Field1,
                comment = tSGGS_FinalDto.comment,
                Gurumukhi = tSGGS_FinalDto.Gurumukhi,
                Trans = tSGGS_FinalDto.Trans,
                Gita_Ref = tSGGS_FinalDto.Gita_Ref,
                Bible_Ref = tSGGS_FinalDto.Bible_Ref,
                QUran_Ref = tSGGS_FinalDto.QUran_Ref,
                Mb_version = tSGGS_FinalDto.Mb_version,
                Raag_english = tSGGS_FinalDto.Raag_english,
                Raag_Punjabi = tSGGS_FinalDto.Raag_Punjabi,
                Raag_Trans = tSGGS_FinalDto.Raag_Trans
            };

            _context.tSGGS_Final.Add(tSGGS_Final1);
            await _context.SaveChangesAsync();

            return tSGGS_Final1;
        }
    }
}