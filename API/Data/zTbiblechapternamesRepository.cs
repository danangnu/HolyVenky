using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class zTbiblechapternamesRepository : IZtbiblechapternamesRepository
    {
        private readonly DataContext _context;
        public zTbiblechapternamesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<zTbible_Chapter_Names>> GetBChapterAsync(UserParams userParams)
        {
            var query = _context.zTbible_Chapter_Names.AsQueryable();
        
            if (!string.IsNullOrEmpty(userParams.Field2))
                query = query.Where(s => s.Field2.ToLower().Contains(userParams.Field2.ToLower()));

            query = query.OrderBy(o => o.ID);

            return await PagedList<zTbible_Chapter_Names>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

        public async Task<zTbible_Chapter_Names> GetBChapterByIdAsync(int id)
        {
            return await _context.zTbible_Chapter_Names.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(zTbible_Chapter_Names ztbible_chapter_names)
        {
            _context.Entry(ztbible_chapter_names).State = EntityState.Modified;
        }
    }
}