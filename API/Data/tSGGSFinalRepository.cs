using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class tSGGSFinalRepository : ItsggsFinalRepository
    {
        private readonly DataContext _context;
        public tSGGSFinalRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<tSGGS_Final> GetGurumukhiByIdAsync(int id)
        {
            return await _context.tSGGS_Final.FindAsync(id);
        }

        public async Task<PagedList<tSGGS_Final>> GetGurumukhiAsync(UserParams userParams)
        {
            var query = _context.tSGGS_Final.AsQueryable();

            if (!string.IsNullOrEmpty(userParams.Comment))
            {
                if (userParams.Comment.Equals("all")) {
                    if (!string.IsNullOrEmpty(userParams.Verse))
                        query = query.Where(s => s.vERSE.ToLower().Contains(userParams.Verse.ToLower()) || s.comment.ToLower().Contains(userParams.Verse.ToLower()) 
                            || s.Gurumukhi.ToLower().Contains(userParams.Verse.ToLower()) || s.Trans.ToLower().Contains(userParams.Verse.ToLower()));
                } else {
                    if (userParams.Comment.Equals("verse")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.vERSE.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Comment.Equals("comment")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.comment.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Comment.Equals("gurumukhi")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Gurumukhi.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                    if (userParams.Comment.Equals("trans")) {
                        if (!string.IsNullOrEmpty(userParams.Verse))
                            query = query.Where(s => s.Trans.ToLower().Contains(userParams.Verse.ToLower()));
                    }
                }
            }

            query = query.OrderBy(o => o.ID);

            return await PagedList<tSGGS_Final>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(tSGGS_Final tsggs_final)
        {
            _context.Entry(tsggs_final).State = EntityState.Modified;
        }
    }
}