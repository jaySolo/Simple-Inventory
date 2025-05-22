using jsolo.simpleinventory.core.entities;


namespace jsolo.simpleinventory.impl.persistance.mappings
{
    public class ProductSupplierMap : ValueObjectMap<ProductVendor>
    {
        public ProductSupplierMap() : base("products_suppliers")
        {
            Id(ps => ps.Id, map =>
            {
                map.Length(128);
            });

            ManyToOne(ps => ps.Product, map =>
            {
                map.Column("product_id");
                map.Unique(false);
            });

            ManyToOne(ps => ps.Supplier, map =>
            {
                map.Column("supplier_id");
                map.Unique(false);
            });
        }
    }
}
