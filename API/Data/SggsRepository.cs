using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class SggsRepository : ISggsRepository
    {
        private readonly DataContext _context;
        public SggsRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<PagedList<tblsggs>> GetSggsAsync(UserParams userParams)
        {
            var query = _context.tblsggs.AsQueryable();
            
            if (!string.IsNullOrEmpty(userParams.BookTitle))
            {
                if (userParams.BookTitle.Equals("all")) {
                    if (!string.IsNullOrEmpty(userParams.TextData))
                        query = query.Where(s => s.BookTitle.ToLower().Contains(userParams.TextData.ToLower()) || s.TextData.ToLower().Contains(userParams.TextData.ToLower()) 
                            || s.Gita.ToLower().Contains(userParams.TextData.ToLower()) || s.Quran.ToLower().Contains(userParams.TextData.ToLower()));
                } else {
                    if (userParams.BookTitle.Equals("bookTitle")) {
                        if (!string.IsNullOrEmpty(userParams.TextData))
                            query = query.Where(s => s.BookTitle.ToLower().Contains(userParams.TextData.ToLower()));
                    }
                    if (userParams.BookTitle.Equals("textData")) {
                        if (!string.IsNullOrEmpty(userParams.TextData))
                            query = query.Where(s => s.TextData.ToLower().Contains(userParams.TextData.ToLower()));
                    }
                    if (userParams.BookTitle.Equals("gita")) {
                        if (!string.IsNullOrEmpty(userParams.TextData))
                            query = query.Where(s => s.Gita.ToLower().Contains(userParams.TextData.ToLower()));
                    }
                    if (userParams.BookTitle.Equals("quran")) {
                        if (!string.IsNullOrEmpty(userParams.TextData))
                            query = query.Where(s => s.Quran.ToLower().Contains(userParams.TextData.ToLower()));
                    }
                }
            }
            
            query = query.OrderBy(o => o.id);

            return await PagedList<tblsggs>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

        public async Task<tblsggs> GetSggsByIdAsync(int id)
        {
            return await _context.tblsggs.FindAsync(id);
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void Update(tblsggs sggs)
        {
            _context.Entry(sggs).State = EntityState.Modified;
        }
    }
}