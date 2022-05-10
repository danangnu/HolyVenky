using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class tblsggsDto
    {
        [Required]
        public string BookTitle { get; set; }
        public string REf { get; set; }
        [Required]
        public string TextData { get; set; }
        public int? Verse_Length { get; set; }
        public string Gita { get; set; }
        public string Quran { get; set; }
        public string Bible { get; set; }
        public string MBs_version { get; set; }
        public string Readers_comment { get; set; }
        public string BTags { get; set; }
    }
}