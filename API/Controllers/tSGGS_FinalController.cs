using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
    public class tSGGS_FinalController : BaseApiController
    {
        private readonly ItsggsFinalRepository _itsggsFinalRepository;
        public tSGGS_FinalController(ItsggsFinalRepository itsggsFinalRepository)
        {
            _itsggsFinalRepository = itsggsFinalRepository;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<tSGGS_Final>>> GettSGGS_Finals([FromQuery]UserParams userParams)
        {
            var tsggs_final = await _itsggsFinalRepository.GetGurumukhiAsync(userParams);

            if (tsggs_final.Count<=0) {
                return BadRequest("Data Not Found");
            }

            Response.AddPaginationHeader(tsggs_final.CurrentPage, tsggs_final.PageSize, tsggs_final.TotalCount, tsggs_final.TotalPages);

            return Ok(tsggs_final);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<tSGGS_Final>> GettSGGS_Final(int id)
        {
            return await _itsggsFinalRepository.GetGurumukhiByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateGurumukhi(tSGGS_FinalDto tsggs_FinalDto, int id)
        {
            var tsggs_Final1 = await _itsggsFinalRepository.GetGurumukhiByIdAsync(id);

            tsggs_Final1.line_number = tsggs_FinalDto.line_number;
            tsggs_Final1.page_No = tsggs_FinalDto.page_No;
            tsggs_Final1.vERSE = tsggs_FinalDto.vERSE;
            tsggs_Final1.Field1 = tsggs_FinalDto.Field1;
            tsggs_Final1.comment = tsggs_FinalDto.comment;
            tsggs_Final1.Gurumukhi = tsggs_FinalDto.Gurumukhi;
            tsggs_Final1.Trans = tsggs_FinalDto.Trans;
            tsggs_Final1.Gita_Ref = tsggs_FinalDto.Gita_Ref;
            tsggs_Final1.Bible_Ref = tsggs_FinalDto.Bible_Ref;
            tsggs_Final1.QUran_Ref = tsggs_FinalDto.QUran_Ref;
            tsggs_Final1.Mb_version = tsggs_FinalDto.Mb_version;
            tsggs_Final1.Raag_english = tsggs_FinalDto.Raag_english;
            tsggs_Final1.Raag_Punjabi = tsggs_FinalDto.Raag_Punjabi;
            tsggs_Final1.Raag_Trans = tsggs_FinalDto.Raag_Trans;

            _itsggsFinalRepository.Update(tsggs_Final1);

            if (await _itsggsFinalRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update hadiths");
        }
    }
}