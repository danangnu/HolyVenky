using System.Collections.Generic;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class TGandhisquotesRepository : ITgandhisquotesRepository
    {
        private readonly DataContext _context;
        public TGandhisquotesRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<TGandhis_quotes>> GetGandhiAsync(UserParams userParams)
        {
            var query = _context.TGandhis_quotes.AsNoTracking();
            return await PagedList<TGandhis_quotes>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<TGandhis_quotes> GetGandhiByIdAsync(int id)
        {
            return await _context.TGandhis_quotes.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(TGandhis_quotes tgandhis_quotes)
        {
            _context.Entry(tgandhis_quotes).State = EntityState.Modified;
        }
    }
}