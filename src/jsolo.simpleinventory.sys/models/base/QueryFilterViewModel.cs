using System.Collections.Generic;


namespace jsolo.simpleinventory.sys.models;



public class QueryFilterViewModel
{
    public int PageSize { get; set; } = -1;

    public int PageIndex { get; set; } = -1;

#nullable enable
    public string? SortBy { get; set; }

    public string? OrderBy { get; set; }
#nullable disable
}



public class QueryFilterResultsViewModel<T> where T : class
{
    public int Total { get; set; }

    public IList<T> Items { get; set; } = new List<T>();
}
