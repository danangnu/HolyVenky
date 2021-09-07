using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IYtquranRepository
    {
         void Update(ytquran ytquran);
         Task<bool> SaveAllAsync();
         Task<PagedList<ytquran>> GetQuranAsync(UserParams userParams);
         Task<ytquran> GetQuranByIdAsync(int id);
    }
}