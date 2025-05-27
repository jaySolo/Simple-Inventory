using jsolo.simpleinventory.core.entities;

using NHibernate.Mapping.ByCode;


namespace jsolo.simpleinventory.impl.persistance.mappings;



public class InventoryMap : EntityMap<Inventory, Guid>
{
    public InventoryMap() : base("inventories")
    {
        ManyToOne(inventory => inventory.Item, map =>
        {
            map.Column("item_productId");
            map.NotNullable(true);
        });

        Property(inventory => inventory.StockCount, map =>
        {
            map.Column("stock_count");
            map.NotNullable(true);
        });

        Property(inventory => inventory.MinimumQuantity, map =>
        {
            map.Column("minimum_stock_count");
            map.NotNullable(false);
        });

        Property(inventory => inventory.ReOrderQuantity, map =>
        {
            map.Column("minimum_reorder_quantity");
            map.NotNullable(false);
        });

        Bag(inventory => inventory.TransactionsHistory, map =>
        {
            map.Key(k =>
            {
                k.Column("inventory_id");
                k.Update(false);
            });

            map.Cascade(Cascade.All | Cascade.DeleteOrphans);
        }, rel => rel.OneToMany());
    }
}
