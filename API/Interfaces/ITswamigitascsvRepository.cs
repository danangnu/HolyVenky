using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ITswamigitascsvRepository
    {
         void Update(tswami_gita_scsv tswami_gita_scsv);
         Task<bool> SaveAllAsync();
         Task<PagedList<tswami_gita_scsv>> GetPurohitAsync(UserParams userParams);
         Task<tswami_gita_scsv> GetPurohitByIdAsync(int id);
    }
}