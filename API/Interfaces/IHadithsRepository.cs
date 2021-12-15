using System.Threading.Tasks;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
  public interface IHadithsRepository
    {
         void Update(Hadiths hadiths);
         Task<bool> SaveAllAsync();
         Task<PagedList<Hadiths>> GetHadithsAsync(UserParams userParams);
         Task<Hadiths> GetHadithsByIdAsync(int id);
    }
}