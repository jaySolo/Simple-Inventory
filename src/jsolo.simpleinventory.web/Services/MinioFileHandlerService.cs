using jsolo.simpleinventory.sys.common;
using jsolo.simpleinventory.sys.common.interfaces;
using jsolo.simpleinventory.web.Configurations;
using jsolo.simpleinventory.web.Extensions;

using Minio;
using Minio.DataModel.Args;


namespace jsolo.simpleinventory.web.Services;



public class MinioFileHandlerService : IFileHandlerService
{
    private readonly string bucketName;

    private readonly IMinioClient minioClient;

    public MinioFileHandlerService(IConfiguration configuration)
    {
        var appSettings = configuration.GetSection("AppSettings");

        var endpoint = appSettings?.GetValue<string>("StorageLocation") ?? "play.min.io";
        var accessKey = appSettings?.GetValue<string>("StorageCloudKeyAccess") ?? "";
        var secretKey = appSettings?.GetValue<string>("StorageCloudKeySecret") ?? "";
        var secure = false;

        this.minioClient = new MinioClient()
            .WithEndpoint(endpoint)
            .WithCredentials(accessKey, secretKey)
            .WithSSL(secure)
            .Build();

        this.bucketName = appSettings?.GetValue<string>("StorageCloudBucket") ?? "";
    }


    public async Task<DataOperationResult<byte[]?>> GetFile(string fileName)
    {
        StatObjectArgs statObjectArgs = new StatObjectArgs().WithBucket(bucketName)
                                                            .WithObject(fileName);

        byte[]? fileContents = null;

        try
        {
            if (await this.minioClient.StatObjectAsync(statObjectArgs) is { })
            {
                return await minioClient.GetObjectAsync(
                    new GetObjectArgs().WithBucket(bucketName)
                                       .WithObject(fileName)
                                       .WithCallbackStream((stream) =>
                                       {
                                           fileContents = stream.ReadAllBytes();
                                       })).ContinueWith((objstat) =>
                                       {
                                           return DataOperationResult<byte[]?>.Success(fileContents);
                                       });
            }
            else
            {
                return DataOperationResult<byte[]?>.NotFound;
            }
        }
        catch (Exception ex)
        {
            return DataOperationResult<byte[]?>.Failure(ex?.InnerException?.ToString() ?? ex.ToString());
        }
    }

    public async Task<DataOperationResult<string>> AddFile(byte[] contents, string filePrefix = "")
    {
        try
        {
            var fileName = DateTime.Now.GetHashCode().ToString("X");

            using var stream = new MemoryStream(contents);

            var poa = new PutObjectArgs().WithBucket(bucketName)
                                         .WithObject(fileName)
                                         .WithStreamData(stream)
                                         .WithObjectSize(stream.Length)
                                         .WithContentType("application/octet-stream");

            var soa = new StatObjectArgs().WithBucket(bucketName)
                                          .WithObject(fileName);

            var result = await await minioClient.PutObjectAsync(poa)
                                          .ContinueWith(async (x) => await minioClient.StatObjectAsync(soa));


            if (result.ContentType == "application/octet-stream" && result.Size > 0)
            {
                return DataOperationResult<string>.Success(fileName);
            }

            return DataOperationResult<string>.Failure();
        }
        catch (Exception ex)
        {
            return DataOperationResult<string>.Failure(ex?.InnerException?.ToString() ?? ex.ToString());
        }
    }
}
