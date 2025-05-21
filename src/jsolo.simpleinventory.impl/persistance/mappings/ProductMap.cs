using jsolo.simpleinventory.core.entities;

using NHibernate.Mapping.ByCode;


namespace jsolo.simpleinventory.impl.persistance.mappings;



public class ProductMap : EntityMap<Product, int>
{
    public ProductMap() : base("products")
    {
        Property(product => product.InternalProductNumber, map =>
        {
            map.Unique(true);
            map.Length(100);
            map.Column("internal_product_number");
            map.NotNullable(false);
        });

        Property(product => product.ExternalProductNumber, map =>
        {
            // map.Unique(true);
            map.Length(100);
            map.Column("external_product_number");
            map.NotNullable(false);
        });

        Property(product => product.ProductName, map =>
        {
            // map.Unique(true);
            map.Length(200);
            map.Column("product_name");
            map.NotNullable(false);
        });

        ManyToOne(product => product.Type, map =>
        {
            map.Column("type_code");
            // map.NotNullable(true);
        });

        Property(product => product.Make, map =>
        {
            map.Length(200);
            map.Column("product_make");
            map.NotNullable(false);
        });

        Property(product => product.Description, map => map.Column("description"));

        Component(product => product.MarketPrice, comp =>
        {
            comp.Property(m => m.Amount, compMap =>
            {
                compMap.Column("product_price_value");
            });

            comp.ManyToOne(m => m.Currency, compMap =>
            {
                compMap.Column("product_price_currency_code");
            });
        });

        Property(product => product.BarCode, map =>
        {
            // map.Unique(true);
            map.Length(100);
            map.Column("product_barcode");
            map.NotNullable(false);
        });
    }
}
