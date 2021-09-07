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

            if (!string.IsNullOrEmpty(userParams.Verse))
                query = query.Where(s => s.VERSE.Contains(userParams.Verse));
            
            if (!string.IsNullOrEmpty(userParams.Comment))
                query = query.Where(s => s.COMMENT.Contains(userParams.Comment));

            if (!string.IsNullOrEmpty(userParams.Chapter))
                query = query.Where(s => s.Chapter.Contains(userParams.Chapter));

            if (!string.IsNullOrEmpty(userParams.IGS))
                query = query.Where(s => s.IGS.Contains(userParams.IGS));

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