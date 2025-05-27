using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;


using jsolo.simpleinventory.core.entities;
using jsolo.simpleinventory.core.enums;
using jsolo.simpleinventory.sys.common.handlers;
using jsolo.simpleinventory.sys.common.interfaces;
// using jsolo.simpleinventory.sys.helpers;
using jsolo.simpleinventory.sys.models;

using MediatR;


namespace jsolo.simpleinventory.sys.queries.Media;



public class GetMediumQuery : IRequest<byte[]>
{
    public string Id { get; set; } = "";
}



public class GetMediumQueryHandler :  RequestHandlerBase<GetMediumQuery, byte[]>
{
    private readonly IFileHandlerService FilesHandler;


    public GetMediumQueryHandler(
        IDatabaseContext context,
        ICurrentUserService currentUserService,
        IDateTimeService dateTimeService,
        IFileHandlerService fileHandler
    ) : base(context, currentUserService, dateTimeService) => this.FilesHandler = fileHandler;


    public override async Task<byte[]> Handle(GetMediumQuery request, CancellationToken token)
    {
        var file = await FilesHandler.GetFile(request.Id);

        return file.Succeeded && file.IsDataValid ? file.Data : null;
    }
}
