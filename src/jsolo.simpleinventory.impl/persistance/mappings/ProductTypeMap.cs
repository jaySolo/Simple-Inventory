using jsolo.simpleinventory.core.objects;


namespace jsolo.simpleinventory.impl.persistance.mappings;



public class ProductTypeMap : ValueObjectMap<ProductType>
{
    public ProductTypeMap() : base("product_types")
    {
        Id(productType => productType.Name, map =>
        {
            map.Length(100);
            map.Column("name");
        });

        Property(productType => productType.Description, map => map.Column("description"));
    }
}
