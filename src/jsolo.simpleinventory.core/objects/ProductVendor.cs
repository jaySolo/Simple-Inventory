using System;
using System.Collections.Generic;

using jsolo.simpleinventory.core.common;


namespace jsolo.simpleinventory.core.entities;



/// <summary>
/// 'Hidden' <see cref="ValueObject"> used to link <see cref="Product"/> and <see cref="Suppliers"/>
/// </summary>

public class ProductVendor : ValueObject
{
    public virtual Guid Id { get; set; }

    public virtual Product Product { get; set; }

    public virtual Vendor Supplier { get; set; }


    protected override IEnumerable<object> GetEqualityComponents() => new List<object>
    {
        this.Product.Id,
        this.Supplier.Id
    };
}
