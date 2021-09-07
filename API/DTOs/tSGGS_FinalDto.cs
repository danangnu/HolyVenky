using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class tSGGS_FinalDto
    {
        [Required]
        public double line_number { get; set; }
        [Required]
        public string page_No { get; set; }
        public string vERSE { get; set; }
        public string Field1 { get; set; }
        public string comment { get; set; }
        public string Gurumukhi { get; set; }
        public string Trans { get; set; }
        public string Gita_Ref { get; set; }
        public string Bible_Ref { get; set; }
        public string QUran_Ref { get; set; }
        public string Mb_version { get; set; }
        public string Raag_english { get; set; }
        public string Raag_Punjabi { get; set; }
        public string Raag_Trans { get; set; }
    }
}