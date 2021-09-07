using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ITgandhisquotesRepository
    {
         void Update(TGandhis_quotes tgandhis_quotes);
         Task<bool> SaveAllAsync();
         Task<PagedList<TGandhis_quotes>> GetGandhiAsync(UserParams userParams);
         Task<TGandhis_quotes> GetGandhiByIdAsync(int id);
    }
}