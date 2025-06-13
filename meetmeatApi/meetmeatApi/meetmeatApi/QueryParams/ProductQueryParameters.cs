namespace meetmeatApi.QueryParams
{
    public class ProductQueryParameters
    {
        public string? Category {  get; set; }
        public decimal? MinPrice { get; set; }
        public decimal? MaxPrice { get; set; }

        public string? SearchTerm { get; set; }

        public string? SortBy { get; set; }
    }
}
