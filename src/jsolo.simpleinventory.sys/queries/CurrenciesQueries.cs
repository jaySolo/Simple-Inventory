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


namespace jsolo.simpleinventory.sys.queries.Currencies;



public class GetCurrenciesQuery : IRequest<QueryFilterResultsViewModel<CurrencyViewModel>>
{
    public CurrenciesFilterViewModel? Parameters { get; set; }
}



public class GetCurrenciesQueryHandler : IRequestHandler<GetCurrenciesQuery, QueryFilterResultsViewModel<CurrencyViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetCurrenciesQueryHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<QueryFilterResultsViewModel<CurrencyViewModel>> Handle(GetCurrenciesQuery req, CancellationToken token = default)
    {
        QueryFilterResultsViewModel<CurrencyViewModel> getCurrencies()
        {

            var currencies = _context.Currencies.ToArray();

            List<CurrencyViewModel> results = new();
            int resultsCount = 0;


            if (req.Parameters is { })
            {

                // filter by supplied parameters
                if (req.Parameters.Code?.Length > 0)
                {
                    currencies = currencies.Where(currency => currency.Code.Contains(req.Parameters.Code, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.Name?.Length > 0)
                {
                    currencies = currencies.Where(currency => currency.Name.Contains(req.Parameters.Name, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.Symbol?.Length > 0)
                {
                    currencies = currencies.Where(currency => currency.Symbol.Contains(req.Parameters.Symbol, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }


                // apply sort parameters
                var sortDesc = req.Parameters.OrderBy == "DESC";
                currencies = (req.Parameters.SortBy?.ToLower() ?? "") switch
                {
                    "symbol" => sortDesc ? currencies.OrderByDescending(currency => currency.Symbol).ToArray() : currencies.OrderBy(currency => currency.Symbol).ToArray(),

                    "name" => sortDesc ? currencies.OrderByDescending(currency => currency.Name).ToArray() : currencies.OrderBy(currency => currency.Name).ToArray(),

                    _ => sortDesc ? currencies.OrderByDescending(currency => currency.Code).ToArray() : currencies.OrderBy(c => c.Code).ToArray(),
                };

                // then filter according to page size
                if (req.Parameters?.PageSize > 0 && req.Parameters?.PageIndex > 0)
                {
                    resultsCount = results.Count;

                    results.AddRange(currencies.Skip(
                        req.Parameters.PageSize * (req.Parameters.PageIndex - 1)
                    ).Take(req.Parameters.PageSize).Select(c => c.ToViewModel()));
                }
                else
                {
                    results.AddRange(currencies.Select(c => c.ToViewModel()));
                }
            }
            else
            {
                resultsCount = currencies.Length;

                results.AddRange(currencies.Select(currency => currency.ToViewModel()));
            }

            return new QueryFilterResultsViewModel<CurrencyViewModel>
            {
                Items = results,
                Total = resultsCount
            };
        }


        return await Task.FromResult(getCurrencies());
    }
}



public class GetCurrencyDetailsQuery : IRequest<DataOperationResult<CurrencyViewModel>>
{
    public string CurrencyCode { get; set; }
}



public class GetCurrencyDetailsQueryHandler : IRequestHandler<GetCurrencyDetailsQuery, DataOperationResult<CurrencyViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetCurrencyDetailsQueryHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<DataOperationResult<CurrencyViewModel>> Handle(GetCurrencyDetailsQuery request, CancellationToken cancellationToken = default)
    {
        DataOperationResult<CurrencyViewModel> getCurrency()
        {
            var currency = _context.Currencies.FirstOrDefault(currency => currency.Code.Contains(request.CurrencyCode, StringComparison.InvariantCultureIgnoreCase)) ?? null;

            if (currency is not null)
            {
                Task.FromResult(DataOperationResult<CurrencyViewModel>.Success(currency.ToViewModel()));
            }

            return DataOperationResult<CurrencyViewModel>.NotFound;
        }

        return await Task.FromResult(getCurrency());
    }
}
