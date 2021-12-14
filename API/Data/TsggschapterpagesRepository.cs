using System.Linq;
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
            var query = _context.Tsggs_chapter___pages.AsQueryable();

            if (!string.IsNullOrEmpty(userParams.Comment))
            {
                if (userParams.Comment.Equals("all")) {
                    if (!string.IsNullOrEmpty(userParams.Chapter))
                        query = query.Where(s => s.Chapter___ragas.ToLower().Contains(userParams.Chapter.ToLower()) || s.Gurumkhi.ToLower().Contains(userParams.Chapter.ToLower()));
                } else {
                    if (userParams.Comment.Equals("chapter")) {
                        if (!string.IsNullOrEmpty(userParams.Chapter))
                            query = query.Where(s => s.Chapter___ragas.ToLower().Contains(userParams.Chapter.ToLower()));
                    }
                    if (userParams.Comment.Equals("gurumkhi")) {
                        if (!string.IsNullOrEmpty(userParams.Chapter))
                            query = query.Where(s => s.Gurumkhi.ToLower().Contains(userParams.Chapter.ToLower()));
                    }
                }
            }
            
            query = query.OrderBy(o => o.Order_in_SGGS);

            return await PagedList<Tsggs_chapter___pages>.CreateAsync(query.AsNoTracking(), userParams.PageNumber, userParams.PageSize);
        }

        public async Task<Tsggs_chapter___pages> GetSChapterByIdAsync(int order_in_SGGS)
        {
            return await _context.Tsggs_chapter___pages
                .Where(x => x.Order_in_SGGS == order_in_SGGS)
                .SingleOrDefaultAsync();
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