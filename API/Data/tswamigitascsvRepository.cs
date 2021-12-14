using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class tswamigitascsvRepository : ITswamigitascsvRepository
    {
        private readonly DataContext _context;
        public tswamigitascsvRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<tswami_gita_scsv>> GetPurohitAsync(UserParams userParams)
        {
            var query = _context.tswami_gita_scsv.AsQueryable();

            if (!string.IsNullOrEmpty(userParams.Comment))
            {
                if (userParams.Comment.Equals("all")) {
                    if (!string.IsNullOrEmpty(userParams.Verse))
                        query = query.Where(s => s.VERSE.ToLower().Contains(userParams.Verse.ToLower()) || s.COMMENT.ToLower().Contains(userParams.Verse.ToLower()) 
                            || s.Chapter.ToLower().Contains(userParams.Verse.ToLower()) || s.IGS.ToLower().Contains(userParams.Verse.ToLower()));
                } else {
                    if (userParams.Comment.Equals("verse")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.VERSE.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Comment.Equals("comment")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.COMMENT.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Comment.Equals("chapter")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Chapter.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Comment.Equals("igs")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.IGS.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                }
            }
            
            query = query.OrderBy(o => o.ID);

            return await PagedList<tswami_gita_scsv>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

        public async Task<tswami_gita_scsv> GetPurohitByIdAsync(int id)
        {
            return await _context.tswami_gita_scsv.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(tswami_gita_scsv tswami_gita_scsv)
        {
            _context.Entry(tswami_gita_scsv).State = EntityState.Modified;
        }
    }
}