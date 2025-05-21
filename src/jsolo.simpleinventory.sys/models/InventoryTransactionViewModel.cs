using System;


namespace jsolo.simpleinventory.sys.models;



public class InventoryTransactionViewModel
{
    public Guid Id { get; set; }

    public InventoryViewModel Inventory { get; set; }

    public InventoryTransactionTypeViewModel Type { get; set; }

    public DateTime TimeStamp { get; set; }

    public double Amount { get; set; }
}

public class InventoryTransactionTypeViewModel
{
    public char Value { get; set; }

    public string Name { get; set; }
}


public class InventoryTransactionsFilterViewModel : QueryFilterViewModel
{
    public Guid? InventoryId { get; set; }

    public DateTime? Start { get; set; }

    public DateTime? End { get; set; }

    public double? Minimum { get; set; }

    public double? Maximum { get; set; }
}
