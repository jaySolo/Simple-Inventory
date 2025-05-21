using jsolo.simpleinventory.core.objects;


namespace jsolo.simpleinventory.impl.persistance.mappings;



public class CurrencyMap : ValueObjectMap<Currency>
{
    public CurrencyMap() : base("currencies")
    {
        Id(currency => currency.Name, map =>
        {
            map.Length(100);
            map.Column("name");
        });

        Property(currency => currency.Symbol, map =>
        {
            map.Length(5);
            map.Column("symbol");
            map.NotNullable(false);
        });

        Property(currency => currency.Code, map =>
        {
            map.Unique(true);
            map.Length(3);
            map.Column("code");
            map.NotNullable(false);
        });

        Property(currency => currency.Description, map => map.Column("description"));
    }
}
