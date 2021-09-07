using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IZtbiblechapternamesRepository
    {
         void Update(zTbible_Chapter_Names ztbible_chapter_names);
         Task<bool> SaveAllAsync();
         Task<PagedList<zTbible_Chapter_Names>> GetBChapterAsync(UserParams userParams);
         Task<zTbible_Chapter_Names> GetBChapterByIdAsync(int id);
    }
}