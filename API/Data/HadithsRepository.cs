using System.Collections.Generic;
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
            var query = _context.Hadiths.AsNoTracking();
            return await PagedList<Hadiths>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
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