using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
  [Authorize]
  public class UsersController : BaseApiController
  {
    private readonly DataContext _context;
    private readonly IMemberRepository _memberRepository;
    public UsersController(DataContext context, IMemberRepository memberRepository)
    {
      _memberRepository = memberRepository;
      _context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUser>>> GetMembers([FromQuery]UserParams userParams)
    {
        var members = await _memberRepository.GetMembersAsync(userParams);

        if (members.Count<=0) {
            return BadRequest("Data Not Found");
        }

        Response.AddPaginationHeader(members.CurrentPage, members.PageSize, members.TotalCount, members.TotalPages);

        return Ok(members);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<AppUser>> GetUser(int id)
    {
      return await _context.Users.FindAsync(id);
    }
  }
}