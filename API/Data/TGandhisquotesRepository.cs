using System.Collections.Generic;
using System.Linq;
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
            var query = _context.TGandhis_quotes.AsQueryable();

            if (!string.IsNullOrEmpty(userParams.Field1))
                query = query.Where(s => s.Field1.Contains(userParams.Field1));
            
            query = query.OrderBy(o => o.ID);

            return await PagedList<TGandhis_quotes>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
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