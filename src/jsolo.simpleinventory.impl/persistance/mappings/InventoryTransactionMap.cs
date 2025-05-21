using jsolo.simpleinventory.core.entities;
using jsolo.simpleinventory.core.enums;
using NHibernate.Mapping.ByCode;


namespace jsolo.simpleinventory.impl.persistance.mappings;



public class InventoryTransactionMap : EntityMap<InventoryTransaction, Guid>
{
    public InventoryTransactionMap() : base("inventory_transactions")
    {
        Property(tx => tx.Date, map =>
        {
            map.Column("timestamp");
            map.NotNullable(true);
            map.Type<NHibernate.Type.DateTimeType>();
        });

        Property(tx => tx.Type, map =>
        {
            map.Column("type_code");
            map.NotNullable(true);
            map.Type<NHibernate.Type.EnumCharType<InventoryTransactionType>>();
        });

        ManyToOne(tx => tx.Inventory, map =>
        {
            map.Column("inventory_id");
            map.NotNullable(true);
        });

        Property(tx => tx.Amount, map =>
        {
            map.Column("");
            map.NotNullable(true);
        });
    }
}
