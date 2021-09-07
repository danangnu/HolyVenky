namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize = 10;

        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }

        public string Sura { get; set; }
        public string Verse { get; set; }
        public string Comment { get; set; }
        public string Chapter { get; set; }
        public string IGS { get; set; }
    }
}