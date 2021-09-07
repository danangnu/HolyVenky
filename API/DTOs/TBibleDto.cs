using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class TBibleDto
    {
        [Required]
        public string BookTitle { get; set; }
        [Required]
        public string REf { get; set; }
        [Required]
        public string TextData { get; set; }
        [Required]
        public int Verse_Length { get; set; }
        public string Gita { get; set; }
        public string Quran { get; set; }
        public string SSGSahib { get; set; }
        public string MBs_version { get; set; }
        public string Readers_comment { get; set; }
        public string BTags { get; set; }
    }
}