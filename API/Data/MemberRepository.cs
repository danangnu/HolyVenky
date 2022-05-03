using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
  public class MemberRepository : IMemberRepository
  {
    private readonly DataContext _context;
    public MemberRepository(DataContext context)
    {
      _context = context;
    }

    public async Task<PagedList<AppUser>> GetMembersAsync(UserParams userParams)
    {
        var query = _context.Users.AsQueryable();

        if (!string.IsNullOrEmpty(userParams.Comment))
        {
            if (userParams.Comment.Equals("all")) {
                if (!string.IsNullOrEmpty(userParams.Username))
                    query = query.Where(s => s.UserName.ToLower().Contains(userParams.Username.ToLower()));
            } else {
                if (userParams.Comment.Equals("username")) {
                    if (!string.IsNullOrEmpty(userParams.Username))
                            query = query.Where(s => s.UserName.ToLower().Contains(userParams.Username.ToLower()));
                }
            }
        }
            
        query = query.OrderBy(o => o.Id);

        return await PagedList<AppUser>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
    }

    public async Task<AppUser> GetMemberByIdAsync(int id)
    {
        return await _context.Users.FindAsync(id);
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0;
    }

    public void Update(AppUser appUser)
    {
        _context.Entry(appUser).State = EntityState.Modified;
    }
  }
}