using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using jsolo.simpleinventory.sys.common;
using jsolo.simpleinventory.sys.common.interfaces;
using jsolo.simpleinventory.sys.extensions;
using jsolo.simpleinventory.sys.models;

using MediatR;


namespace jsolo.simpleinventory.sys.queries.Inventories;


public class GetInventoryTransactionsQuery : IRequest<QueryFilterResultsViewModel<InventoryTransactionViewModel>>
{
#nullable enable
    public InventoryTransactionsFilterViewModel? Parameters { get; set; }
#nullable disable
}



public class GetInventoryTransactionsQueryHandler : IRequestHandler<GetInventoryTransactionsQuery, QueryFilterResultsViewModel<InventoryTransactionViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetInventoryTransactionsQueryHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<QueryFilterResultsViewModel<InventoryTransactionViewModel>> Handle(GetInventoryTransactionsQuery req, CancellationToken token = default)
    {
        QueryFilterResultsViewModel<InventoryTransactionViewModel> getInventories()
        {

            var Inventories = _context.InventoryTransactions.ToArray();

            List<InventoryTransactionViewModel> results = new();
            int resultsCount = 0;


            if (req.Parameters is { })
            {
                // filter by supplied parameters
                if (req.Parameters.InventoryId is not null && !req.Parameters.InventoryId.Equals(Guid.Empty))
                {
                    Inventories = Inventories.Where(inventoryTransaction => inventoryTransaction.Inventory.Id.Equals(req.Parameters.InventoryId.Value)).ToArray();
                }

                switch (req.Parameters.Start)
                {
                    case not null when req.Parameters.End is not null:
                        {
                            Inventories = Inventories.Where(
                                inventoryTransaction => req.Parameters.Start.Value <= inventoryTransaction.Date && inventoryTransaction.Date <= req.Parameters.End.Value
                            ).ToArray();
                            break;
                        }

                    case not null:
                        {
                            Inventories = Inventories.Where(
                                inventoryTransaction => req.Parameters.Start.Value <= inventoryTransaction.Date
                            ).ToArray();
                            break;
                        }

                    default:
                        if (req.Parameters.End is not null)
                        {
                            Inventories = Inventories.Where(
                                inventoryTransaction => inventoryTransaction.Date <= req.Parameters.End.Value
                            ).ToArray();
                        }

                        break;
                }

                switch (req.Parameters.Minimum)
                {
                    case not null when req.Parameters.Maximum is not null:
                        {
                            Inventories = Inventories.Where(inventoryTransaction => req.Parameters.Minimum <= inventoryTransaction.Amount && inventoryTransaction.Amount <= req.Parameters.Maximum).ToArray();
                            break;
                        }

                    case not null:
                        {
                            Inventories = Inventories.Where(inventoryTransaction => req.Parameters.Minimum <= inventoryTransaction.Amount).ToArray();
                            break;
                        }

                    default:
                        if (req.Parameters.End is not null)
                        {
                            Inventories = Inventories.Where(inventoryTransaction => inventoryTransaction.Amount <= req.Parameters.Maximum).ToArray();
                        }

                        break;
                }


                // apply sort parameters
                var sortDesc = req.Parameters.OrderBy == "DESC";
                Inventories = (req.Parameters.SortBy?.ToLower() ?? "") switch
                {
                    "inventory" => sortDesc ? Inventories.OrderByDescending(inventoryTransaction => inventoryTransaction.Inventory.Id).ToArray() : Inventories.OrderBy(inventoryTransaction => inventoryTransaction.Inventory.Id).ToArray(),

                    "date" => sortDesc ? Inventories.OrderByDescending(inventoryTransaction => inventoryTransaction.Date).ToArray() : Inventories.OrderBy(inventoryTransaction => inventoryTransaction.Date).ToArray(),

                    "amount" => sortDesc ? Inventories.OrderByDescending(inventoryTransaction => inventoryTransaction.Amount).ToArray() : Inventories.OrderBy(inventoryTransaction => inventoryTransaction.Amount).ToArray(),

                    _ => sortDesc ? Inventories.OrderByDescending(inventoryTransaction => inventoryTransaction.Id).ToArray() : Inventories.OrderBy(inventoryTransaction => inventoryTransaction.Id).ToArray(),
                };

                resultsCount = results.Count;

                // then filter according to page size
                if (req.Parameters?.PageSize > 0 && req.Parameters?.PageIndex > 0)
                {
                    results.AddRange(Inventories.Skip(
                        req.Parameters.PageSize * (req.Parameters.PageIndex - 1)
                    ).Take(req.Parameters.PageSize).Select(inventoryTransaction => inventoryTransaction.ToViewModel()));
                }
                else
                {
                    results.AddRange(Inventories.Select(inventoryTransaction => inventoryTransaction.ToViewModel()));
                }
            }
            else
            {
                resultsCount = Inventories.Length;

                results.AddRange(Inventories.Select(inventoryTransaction => inventoryTransaction.ToViewModel()));
            }

            return new QueryFilterResultsViewModel<InventoryTransactionViewModel>
            {
                Items = results,
                Total = resultsCount
            };
        }


        return await Task.FromResult(getInventories());
    }
}



public class GetInventoryTransactionDetailsQuery : IRequest<DataOperationResult<InventoryTransactionViewModel>>
{
    public Guid InventoryTransactionId { get; set; }
}



public class GetInventoryTransactionDetailsQueryHandler : IRequestHandler<GetInventoryTransactionDetailsQuery, DataOperationResult<InventoryTransactionViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetInventoryTransactionDetailsQueryHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<DataOperationResult<InventoryTransactionViewModel>> Handle(GetInventoryTransactionDetailsQuery request, CancellationToken cancellationToken = default)
    {
        DataOperationResult<InventoryTransactionViewModel> getInventory()
        {
            var inventoryTransaction = _context.InventoryTransactions.FirstOrDefault(inventoryTransaction => inventoryTransaction.Id.Equals(request.InventoryTransactionId));

            if (inventoryTransaction is not null)
            {
                Task.FromResult(DataOperationResult<InventoryTransactionViewModel>.Success(inventoryTransaction.ToViewModel()));
            }

            return DataOperationResult<InventoryTransactionViewModel>.NotFound;
        }

        return await Task.FromResult(getInventory());
    }
}
