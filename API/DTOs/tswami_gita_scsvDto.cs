using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class tswami_gita_scsvDto
    {
        [Required]
        public string VERSE { get; set; }
        public string COMMENT { get; set; }
        [Required]
        public string Chapter { get; set; }
        public string IGS { get; set; }
        public double NUMBER { get; set; }
        public string TRANSLITERATION { get; set; }
        public string Gita { get; set; }
        public string Bible_Link { get; set; }
        public string Quran { get; set; }
        public string SSGSahib { get; set; }
        public string MBVersion { get; set; }
        public string readers_Comments { get; set; }
    }
}