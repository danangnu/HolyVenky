using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ItsggsFinalRepository
    {
         void Update(tSGGS_Final tsggs_final);
         Task<bool> SaveAllAsync();
         Task<PagedList<tSGGS_Final>> GetGurumukhiAsync(UserParams userParams);
         Task<tSGGS_Final> GetGurumukhiByIdAsync(int id);
    }
}