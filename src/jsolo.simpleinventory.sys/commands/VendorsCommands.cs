using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

using jsolo.simpleinventory.core.entities;
using jsolo.simpleinventory.core.objects;
using jsolo.simpleinventory.sys.common;
using jsolo.simpleinventory.sys.common.handlers;
using jsolo.simpleinventory.sys.common.interfaces;
using jsolo.simpleinventory.sys.extensions;
using jsolo.simpleinventory.sys.models;

using MediatR;


namespace jsolo.simpleinventory.sys.commands.Vendors;



public class CreateVendorCommand : IRequest<DataOperationResult<VendorViewModel>>
{
    public VendorViewModel NewVendor { get; set; }
}



public class CreateVendorCommandHandler : RequestHandlerBase<CreateVendorCommand, DataOperationResult<VendorViewModel>>
{
    public CreateVendorCommandHandler(
        IDatabaseContext context,
        ICurrentUserService currentUserService,
        IDateTimeService dateTimeService
    ) : base(context, currentUserService, dateTimeService) { }

    public override Task<DataOperationResult<VendorViewModel>> Handle(CreateVendorCommand request, CancellationToken token)
    {
        // string qryBusinessName = ;
        // string qryContactName = $"{r} {request.NewVendor.ContactFirstName} {request.NewVendor.ContactLastName}".ToLower();

        if (Context.Vendors.Any(vendor =>
            vendor.CompanyName.ToLower() == request.NewVendor.BusinessName.ToLower() &&
            vendor.ContactPersonName.Title.ToLower() == request.NewVendor.ContactTitle.ToLower()
        //vendor.ContactPersonName.FullName.ToLower() == qryContactName
        ))
        {
            return Task.FromResult(DataOperationResult<VendorViewModel>.Exists);
        }

        try
        {
            var newId = (Context.Vendors.OrderByDescending(vendor => vendor.Id).FirstOrDefault()?.Id ?? 0) + 1;

            var vendor = new Vendor(
                newId,
                request.NewVendor.BusinessName,
                new Name(request.NewVendor.ContactTitle ?? "", request.NewVendor.ContactLastName ?? "", request.NewVendor.ContactFirstName ?? ""),
                request.NewVendor.ContactTelephone,
                request.NewVendor.ContactMobile,
                request.NewVendor.ContactFax,
                request.NewVendor.ContactEmail,
                request.NewVendor.Address,
                DateTime.Now,
                CurrentUser.UserId.ToString()
            );

            Context.BeginTransaction()
                .Add(vendor)
                .SaveChanges()
                .CloseTransaction();

            return Task.FromResult(DataOperationResult<VendorViewModel>.Success(
                vendor.ToViewModel()
            ));

        }
        catch (Exception ex)
        {
            Context.RollbackChanges().CloseTransaction();

            return Task.FromResult(DataOperationResult<VendorViewModel>.Failure(
                ex.ToString()
            ));
        }
    }
}



public class UpdateVendorCommand : IRequest<DataOperationResult<VendorViewModel>>
{
    public int VendorId { get; set; }

    public VendorViewModel UpdatedVendor { get; set; }
}



public class UpdateVendorCommandHandler : RequestHandlerBase<UpdateVendorCommand, DataOperationResult<VendorViewModel>>
{
    public UpdateVendorCommandHandler(
        IDatabaseContext context,
        ICurrentUserService currentUserService,
        IDateTimeService dateTimeService
    ) : base(context, currentUserService, dateTimeService) { }

    public override Task<DataOperationResult<VendorViewModel>> Handle(UpdateVendorCommand request, CancellationToken cancellationToken)
    {
        var vendor = Context.Vendors.FirstOrDefault(v => v.Id == request.UpdatedVendor.Id);

        if (vendor is null)
        {
            return Task.FromResult(DataOperationResult<VendorViewModel>.NotFound);
        }

        try
        {
            vendor.SetCompanyName(request.UpdatedVendor.BusinessName)
                .SetNameOfContact(new Name(request.UpdatedVendor.ContactTitle, request.UpdatedVendor.ContactLastName, request.UpdatedVendor.ContactFirstName))
                .SetPhysicalAddress(request.UpdatedVendor.Address)
                .SetTelephoneNumber(request.UpdatedVendor.ContactTelephone)
                .SetFacsimileNumber(request.UpdatedVendor.ContactFax)
                .SetMobilePhoneNumber(request.UpdatedVendor.ContactMobile)
                .SetEmailAddress(request.UpdatedVendor.ContactEmail)
                .SetLastModifierAsAt(CurrentUser.UserId.ToString(), DateTime.Now);

            Context.BeginTransaction().Update(vendor).SaveChanges().CloseTransaction();

            return Task.FromResult(DataOperationResult<VendorViewModel>.Success(vendor.ToViewModel()));
        }
        catch
        {
            return Task.FromResult(DataOperationResult<VendorViewModel>.Failure());
        }
    }
}



public class DeleteVendorCommand : IRequest<DataOperationResult>
{
    public int VendorId { get; set; }
}



public class DeleteVendorCommandHandler : RequestHandlerBase<DeleteVendorCommand, DataOperationResult>
{
    public DeleteVendorCommandHandler(
        IDatabaseContext context,
        ICurrentUserService currentUserService,
        IDateTimeService dateTimeService
    ) : base(context, currentUserService, dateTimeService) { }

    public override Task<DataOperationResult> Handle(DeleteVendorCommand request, CancellationToken token)
    {
        var vendor = Context.Vendors.FirstOrDefault(vendor => vendor.Id == request.VendorId);

        if (vendor is null)
        {
            return Task.FromResult(DataOperationResult.NotFound);
        }

        try
        {
            Context.BeginTransaction()
                .Delete(vendor)
                .SaveChanges()
                .CloseTransaction();

            return Task.FromResult(DataOperationResult.Success);
        }
        catch (Exception ex)
        {
            Context.RollbackChanges().CloseTransaction();

            return Task.FromResult(DataOperationResult.Failure(
                ex.ToString()
            ));
        }
    }
}
