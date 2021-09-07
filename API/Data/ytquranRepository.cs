using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class ytquranRepository : IYtquranRepository
    {
        private readonly DataContext _context;
        public ytquranRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<ytquran>> GetQuranAsync(UserParams userParams)
        {
            var query = _context.ytquran.AsQueryable();

            if (!string.IsNullOrEmpty(userParams.Sura))
                query = query.Where(s => s.Sura.Contains(userParams.Sura));
            
            if (!string.IsNullOrEmpty(userParams.Verse))
                query = query.Where(s => s.Verse.Contains(userParams.Verse));

            return await PagedList<ytquran>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

        public async Task<ytquran> GetQuranByIdAsync(int id)
        {
            return await _context.ytquran.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(ytquran ytquran)
        {
            _context.Entry(ytquran).State = EntityState.Modified;
        }
    }
}