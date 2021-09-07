using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class Tsggs_chapter___pagesDto
    {
        [Required]
        public int Order_in_SGGS { get; set; }
        [Required]
        public string Chapter___ragas { get; set; }
        [Required]
        public string Page_Range { get; set; }
        [Required]
        public int Page_Count { get; set; }
        [Required]
        public string Gurumkhi { get; set; } 
    }
}