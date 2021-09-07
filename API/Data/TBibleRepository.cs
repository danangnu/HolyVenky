using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TBibleRepository : ITBibleRepository
    {
        private readonly DataContext _context;
        public TBibleRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<TBible> GetTBibleByIdAsync(int id)
        {
            return await _context.tBible.FindAsync(id);
        }

        public async Task<PagedList<TBible>> GetTBiblesAsync(UserParams userParams)
        {
            var query = _context.tBible.AsNoTracking();
            return await PagedList<TBible>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(TBible tbible)
        {
            _context.Entry(tbible).State = EntityState.Modified;
        }
    }
}