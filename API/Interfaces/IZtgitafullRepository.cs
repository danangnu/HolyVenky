using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IZtgitafullRepository
    {
         void Update(Ztgita_Full ztgita_full);
         Task<bool> SaveAllAsync();
         Task<PagedList<Ztgita_Full>> GetBhaktivedantaAsync(UserParams userParams);
         Task<Ztgita_Full> GetBhaktivedantaByIdAsync(int id);
    }
}