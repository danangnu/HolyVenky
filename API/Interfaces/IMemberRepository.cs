using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
  public interface IMemberRepository
    {
         void Update(AppUser appUser);
         Task<bool> SaveAllAsync();
         Task<PagedList<AppUser>> GetMembersAsync(UserParams userParams);
         Task<AppUser> GetMemberByIdAsync(int id);
    }
}