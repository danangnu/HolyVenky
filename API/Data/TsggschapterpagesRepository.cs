using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TsggschapterpagesRepository : ITsggschapterpagesRepository
    {
        private readonly DataContext _context;
        public TsggschapterpagesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<Tsggs_chapter___pages>> GetSChapterAsync(UserParams userParams)
        {
            var query = _context.Tsggs_chapter___pages.AsNoTracking();
            return await PagedList<Tsggs_chapter___pages>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Tsggs_chapter___pages> GetSChapterByIdAsync(int id)
        {
            return await _context.Tsggs_chapter___pages.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(Tsggs_chapter___pages tsggs_chapter___pages)
        {
            _context.Entry(tsggs_chapter___pages).State = EntityState.Modified;
        }
    }
}