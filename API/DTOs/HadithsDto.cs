using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class HadithsDto
    {
        public string Field2 { get; set; }
        [Required]
        public string Field1 { get; set; }
    }
}