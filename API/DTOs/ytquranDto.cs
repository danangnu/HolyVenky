using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class ytquranDto
    {
        public double? ChaperNVerse { get; set; }
        public string Verse { get; set; }
        [Required]
        public string Sura { get; set; }
        public string Location { get; set; }
        public string OrderRevealed { get; set; }
        public string Gita_Link { get; set; }
        public string Bible_Link { get; set; }
        public string Commentary { get; set; }
        public string MB_s_Version { get; set; }
        public string Number { get; set; }
        public int VLen { get; set; }
        [Required]
        public bool IDs { get; set; }
        public string truncated_ { get; set; }
    }
}