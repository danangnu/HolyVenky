using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ITBibleRepository
    {
         void Update(TBible tbible);
         Task<bool> SaveAllAsync();
         Task<PagedList<TBible>> GetTBiblesAsync(UserParams userParams);
         Task<TBible> GetTBibleByIdAsync(int id);
    }
}