using System.Collections.Generic;
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
            var query = _context.tSGGS_Final.AsNoTracking();
            return await PagedList<tSGGS_Final>.CreateAsync(query, userParams.PageNumber, userParams.PageSize);
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