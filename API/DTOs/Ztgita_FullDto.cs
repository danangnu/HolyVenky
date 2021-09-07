using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class Ztgita_FullDto
    {
        [Required]
        public string Ref { get; set; }
        [Required]
        public string Verse { get; set; }
        [Required]
        public int Verse_Length { get; set; }
        public string Readers_Comments { get; set; }
        public int Field1 { get; set; }
    }
}