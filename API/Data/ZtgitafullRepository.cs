using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ZtgitafullRepository : IZtgitafullRepository
    {
        private readonly DataContext _context;
        public ZtgitafullRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Ztgita_Full>> GetBhaktivedantaAsync(UserParams userParams)
        {
            var query = _context.Ztgita_Full.AsQueryable();

            if (!string.IsNullOrEmpty(userParams.Comment))
            {
                if (userParams.Comment.Equals("all")) {
                    if (!string.IsNullOrEmpty(userParams.Verse))
                        query = query.Where(s => s.Verse.ToLower().Contains(userParams.Verse.ToLower()) || s.Readers_Comments.ToLower().Contains(userParams.Verse.ToLower()));
                } else {
                    if (userParams.Comment.Equals("verse")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Verse.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Comment.Equals("readers_Comments")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Readers_Comments.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                }
            }
            
            query = query.OrderBy(o => o.id);


            return await PagedList<Ztgita_Full>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Ztgita_Full> GetBhaktivedantaByIdAsync(int id)
        {
            return await _context.Ztgita_Full.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Ztgita_Full ztgita_full)
        {
            _context.Entry(ztgita_full).State = EntityState.Modified;
        }
    }
}