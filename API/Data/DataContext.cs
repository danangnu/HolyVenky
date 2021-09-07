using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<Hadiths> Hadiths { get; set; }
        public DbSet<TBible> tBible { get; set; }
        public DbSet<TGandhis_quotes> TGandhis_quotes { get; set; }
        public DbSet<Tsggs_chapter___pages> Tsggs_chapter___pages { get; set; }
        public DbSet<tSGGS_Final> tSGGS_Final { get; set; }
        public DbSet<tswami_gita_scsv> tswami_gita_scsv { get; set; }
        public DbSet<ytquran> ytquran { get; set; }
        public DbSet<zTbible_Chapter_Names> zTbible_Chapter_Names { get; set; }
        public DbSet<Ztgita_Full> Ztgita_Full { get; set; }
    }
}