using System.Collections.Generic;
using System.Linq;
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
            var query = _context.tBible.AsQueryable();
            
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

            return await PagedList<TBible>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
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