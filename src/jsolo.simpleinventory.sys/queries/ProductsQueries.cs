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


namespace jsolo.simpleinventory.sys.queries.Products;


public class GetProductsQuery : IRequest<QueryFilterResultsViewModel<ProductViewModel>>
{
    public ProductsFilterViewModel? Parameters { get; set; }
}



public class GetProductsQueryHandler : IRequestHandler<GetProductsQuery, QueryFilterResultsViewModel<ProductViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetProductsQueryHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<QueryFilterResultsViewModel<ProductViewModel>> Handle(GetProductsQuery req, CancellationToken token = default)
    {
        QueryFilterResultsViewModel<ProductViewModel> getProducts()
        {

            var products = _context.Products.ToArray();

            List<ProductViewModel> results = new();
            int resultsCount = 0;


            if (req.Parameters is { })
            {

                // filter by supplied parameters
                if (req.Parameters.InternalProductNumber?.Length > 0)
                {
                    products =  products.Where(product => product.InternalProductNumber.Contains(req.Parameters.InternalProductNumber, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.ExternalProductNumber?.Length > 0)
                {
                    products =  products.Where(product => product.ExternalProductNumber.Contains(req.Parameters.ExternalProductNumber, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.Name?.Length > 0)
                {
                    products =  products.Where(product => product.ProductName.Contains(req.Parameters.Name, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.Type?.Length > 0)
                {
                    products =  products.Where(product => product.Type.ToString().Contains(req.Parameters.Make, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.Make?.Length > 0)
                {
                    products =  products.Where(product => product.Make.Contains(req.Parameters.Make, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.Barcode?.Length > 0)
                {
                    products =  products.Where(product => product.BarCode?.Contains(req.Parameters.Barcode, StringComparison.InvariantCultureIgnoreCase) ?? false).ToArray();
                }


                // apply sort parameters
                var sortDesc = req.Parameters.OrderBy == "DESC";
                products = (req.Parameters.SortBy?.ToLower() ?? "") switch
                {
                    "externalproductnumber" => sortDesc ?  products.OrderByDescending(product => product.ExternalProductNumber).ToArray() :  products.OrderBy(product => product.ExternalProductNumber).ToArray(),

                    "internalproductnumber" => sortDesc ?  products.OrderByDescending(product => product.InternalProductNumber).ToArray() :  products.OrderBy(product => product.InternalProductNumber).ToArray(),

                    "name" => sortDesc ?  products.OrderByDescending(product => product.ProductName).ToArray() :  products.OrderBy(product => product.ProductName).ToArray(),

                    "type" => sortDesc ?  products.OrderByDescending(product => product.Type).ToArray() :  products.OrderBy(product => product.Type.Name).ToArray(),

                    "make" => sortDesc ?  products.OrderByDescending(product => product.Make).ToArray() :  products.OrderBy(product => product.Make).ToArray(),

                    _ => sortDesc ?  products.OrderByDescending(product => product.Id).ToArray() :  products.OrderBy(product => product.Id).ToArray(),
                };

                resultsCount = results.Count;

                // then filter according to page size
                if (req.Parameters?.PageSize > 0 && req.Parameters?.PageIndex > 0)
                {

                    results.AddRange(products.Skip(
                        req.Parameters.PageSize * (req.Parameters.PageIndex - 1)
                    ).Take(req.Parameters.PageSize).Select(c => c.ToViewModel()));
                }
                else
                {
                    results.AddRange(products.Select(c => c.ToViewModel()));
                }
            }
            else
            {
                resultsCount = products.Length;

                results.AddRange(products.Select(product => product.ToViewModel()));
            }

            return new QueryFilterResultsViewModel<ProductViewModel>
            {
                Items = results,
                Total = resultsCount
            };
        }


        return await Task.FromResult(getProducts());
    }
}



public class GetProductDetailsQuery : IRequest<DataOperationResult<ProductViewModel>>
{
    public int ProductId { get; set; }
}



public class GetProductDetailsQueryHandler : IRequestHandler<GetProductDetailsQuery, DataOperationResult<ProductViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetProductDetailsQueryHandler(IDatabaseContext context)
    {
        _context = context;
    }

    public async Task<DataOperationResult<ProductViewModel>> Handle(GetProductDetailsQuery request, CancellationToken cancellationToken = default)
    {
        DataOperationResult<ProductViewModel> getProduct()
        {
            var product = _context.Products.FirstOrDefault(product => product.Id == request.ProductId);

            if (product is not null)
            {
                return DataOperationResult<ProductViewModel>.Success(product.ToViewModel());
            }

            return DataOperationResult<ProductViewModel>.NotFound;
        }

        return await Task.FromResult(getProduct());
    }
}
