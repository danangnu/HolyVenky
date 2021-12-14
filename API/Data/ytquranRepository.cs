using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ytquranRepository : IYtquranRepository
    {
        private readonly DataContext _context;
        public ytquranRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<ytquran>> GetQuranAsync(UserParams userParams)
        {
            var query = _context.ytquran.AsQueryable();

            if (!string.IsNullOrEmpty(userParams.Sura))
            {
                if (userParams.Sura.Equals("all")) {
                    if (!string.IsNullOrEmpty(userParams.Verse))
                        query = query.Where(s => s.Verse.ToLower().Contains(userParams.Verse.ToLower()) || s.Sura.ToLower().Contains(userParams.Verse.ToLower()) 
                            || s.Location.ToLower().Contains(userParams.Verse.ToLower()) || s.Commentary.ToLower().Contains(userParams.Verse.ToLower()));
                } else {
                    if (userParams.Sura.Equals("verse")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Verse.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Sura.Equals("sura")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Sura.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Sura.Equals("location")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Location.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Sura.Equals("commentary")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Commentary.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                }
            }

            query = query.OrderBy(o => o.ID);

            return await PagedList<ytquran>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

        public async Task<ytquran> GetQuranByIdAsync(int id)
        {
            return await _context.ytquran.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(ytquran ytquran)
        {
            _context.Entry(ytquran).State = EntityState.Modified;
        }
    }
}