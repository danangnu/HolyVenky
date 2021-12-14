using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface ITsggschapterpagesRepository
    {
         void Update(Tsggs_chapter___pages tsggs_chapter___pages);
         Task<bool> SaveAllAsync();
         Task<PagedList<Tsggs_chapter___pages>> GetSChapterAsync(UserParams userParams);
         Task<Tsggs_chapter___pages> GetSChapterByIdAsync(int order_in_SGGS);
    }
}