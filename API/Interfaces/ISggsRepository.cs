using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ISggsRepository
    {
         void Update(tblsggs sggs);
         Task<bool> SaveAllAsync();
         Task<PagedList<tblsggs>> GetSggsAsync(UserParams userParams);
         Task<tblsggs> GetSggsByIdAsync(int id);
    }
}