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

namespace jsolo.simpleinventory.sys.queries.Vendors;


public class GetVendorsQuery : IRequest<QueryFilterResultsViewModel<VendorViewModel>>
{
    public VendorsFilterViewModel? Parameters { get; set; }
}



public class GetVendorsQueryHandler : IRequestHandler<GetVendorsQuery, QueryFilterResultsViewModel<VendorViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetVendorsQueryHandler(IDatabaseContext context)
    {
        this._context = context;
    }

    public async Task<QueryFilterResultsViewModel<VendorViewModel>> Handle(GetVendorsQuery req, CancellationToken token = default)
    {
        QueryFilterResultsViewModel<VendorViewModel> getVendors()
        {

            var vendors = _context.Vendors.ToArray();

            List<VendorViewModel> results = new();
            int resultsCount = 0;


            if (req.Parameters is { })
            {

                // filter by supplied parameters
                if (req.Parameters.BusinessName?.Length > 0)
                {
                    vendors = vendors.Where(vendor => vendor.CompanyName.Contains(req.Parameters.BusinessName, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.ContactName?.Length > 0)
                {
                    vendors = vendors.Where(vendor => vendor.ContactPersonName.FullName.Contains(req.Parameters.ContactName, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.ContactMobile?.Length > 0)
                {
                    vendors = vendors.Where(vendor => vendor.MobilePhoneNumber.Contains(req.Parameters.ContactMobile, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.ContactTelephone?.Length > 0)
                {
                    vendors = vendors.Where(vendor => vendor.TelephoneNumber.Contains(req.Parameters.ContactTelephone, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.ContactFax?.Length > 0)
                {
                    vendors = vendors.Where(vendor => vendor.FascimileNumber.Contains(req.Parameters.ContactFax, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.ContactEmail?.Length > 0)
                {
                    vendors = vendors.Where(vendor => vendor.EmailAddress.Contains(req.Parameters.ContactEmail, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }

                if (req.Parameters.Address?.Length > 0)
                {
                    vendors = vendors.Where(vendor => vendor.PhysicalAddress.Contains(req.Parameters.Address, StringComparison.InvariantCultureIgnoreCase)).ToArray();
                }


                // apply sort parameters
                var sortDesc = req.Parameters.OrderBy == "DESC";
                vendors = (req.Parameters.SortBy?.ToLower() ?? "") switch
                {
                    "businessName" => sortDesc ? vendors.OrderByDescending(vendor => vendor.CompanyName).ToArray() : vendors.OrderBy(vendor => vendor.CompanyName).ToArray(),

                    "contactName" => sortDesc ? vendors.OrderByDescending(vendor => vendor.ContactPersonName.FullName).ToArray() : vendors.OrderBy(vendor => vendor.ContactPersonName.FullName).ToArray(),

                    "contactMobile" => sortDesc ? vendors.OrderByDescending(vendor => vendor.MobilePhoneNumber).ToArray() : vendors.OrderBy(vendor => vendor.MobilePhoneNumber).ToArray(),

                    "contactTelephone" => sortDesc ? vendors.OrderByDescending(vendor => vendor.TelephoneNumber).ToArray() : vendors.OrderBy(vendor => vendor.TelephoneNumber).ToArray(),

                    "contactFax" => sortDesc ? vendors.OrderByDescending(vendor => vendor.FascimileNumber).ToArray() : vendors.OrderBy(vendor => vendor.FascimileNumber).ToArray(),

                    "contactEmail" => sortDesc ? vendors.OrderByDescending(vendor => vendor.EmailAddress).ToArray() : vendors.OrderBy(vendor => vendor.EmailAddress).ToArray(),

                    "address" => sortDesc ? vendors.OrderByDescending(vendor => vendor.PhysicalAddress).ToArray() : vendors.OrderBy(vendor => vendor.PhysicalAddress).ToArray(),

                    _ => sortDesc ? vendors.OrderByDescending(vendor => vendor.Id).ToArray() : vendors.OrderBy(vendor => vendor.Id).ToArray(),
                };

                resultsCount = results.Count;

                // then filter according to page size
                if (req.Parameters?.PageSize > 0 && req.Parameters?.PageIndex > 0)
                {
                    results.AddRange(vendors.Skip(
                        req.Parameters.PageSize * (req.Parameters.PageIndex - 1)
                    ).Take(req.Parameters.PageSize).Select(vendor => vendor.ToViewModel()));
                }
                else
                {
                    results.AddRange(vendors.Select(vendor => vendor.ToViewModel()));
                }
            }
            else
            {
                resultsCount = vendors.Length;

                results.AddRange(vendors.Select(vendor => vendor.ToViewModel()));
            }

            return new QueryFilterResultsViewModel<VendorViewModel>
            {
                Items = results,
                Total = resultsCount
            };
        }


        return await Task.FromResult(getVendors());
    }
}



public class GetVendorDetailsQuery : IRequest<DataOperationResult<VendorViewModel>>
{
    public int VendorId { get; set; }
}



public class GetVendorDetailsQueryHandler : IRequestHandler<GetVendorDetailsQuery, DataOperationResult<VendorViewModel>>
{
    private readonly IDatabaseContext _context;

    public GetVendorDetailsQueryHandler(IDatabaseContext context)
    {
        this._context = context;
    }

    public async Task<DataOperationResult<VendorViewModel>> Handle(GetVendorDetailsQuery request, CancellationToken cancellationToken = default)
    {
        DataOperationResult<VendorViewModel> getVendor()
        {
            var vendor = _context.Vendors.FirstOrDefault(vendor => vendor.Id == request.VendorId);

            if (vendor is not null)
            {
                Task.FromResult(DataOperationResult<VendorViewModel>.Success(vendor.ToViewModel()));
            }

            return DataOperationResult<VendorViewModel>.NotFound;
        }

        return await Task.FromResult(getVendor());
    }
}
