using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class HadithsRepository : IHadithsRepository
    {
        private readonly DataContext _context;
        public HadithsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Hadiths>> GetHadithsAsync(UserParams userParams)
        {
            var query = _context.Hadiths.AsQueryable();

            if (!string.IsNullOrEmpty(userParams.Comment))
            {
                if (userParams.Comment.Equals("all")) {
                    if (!string.IsNullOrEmpty(userParams.Verse))
                        query = query.Where(s => s.Field1.ToLower().Contains(userParams.Verse.ToLower()) || s.Field2.ToLower().Contains(userParams.Verse.ToLower()));
                } else {
                    if (userParams.Comment.Equals("field1")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Field1.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Comment.Equals("field2")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Field2.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                }
            }
            
            query = query.OrderBy(o => o.id);

            return await PagedList<Hadiths>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Hadiths> GetHadithsByIdAsync(int id)
        {
            return await _context.Hadiths.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Hadiths hadiths)
        {
            _context.Entry(hadiths).State = EntityState.Modified;
        }
    }
}