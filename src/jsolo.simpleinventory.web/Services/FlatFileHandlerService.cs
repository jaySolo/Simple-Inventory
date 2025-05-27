using jsolo.simpleinventory.sys.common;
using jsolo.simpleinventory.sys.common.interfaces;
using jsolo.simpleinventory.web.Configurations;
using jsolo.simpleinventory.web.Extensions;


namespace jsolo.simpleinventory.web.Services;



public class FlatFileHandlerService : IFileHandlerService
{
    private readonly string rootDir;

    public FlatFileHandlerService(IConfiguration configuration)
    {
        rootDir = configuration.GetSection("AppSettings")?.GetValue<string>("StorageLocation") ?? "files";
    }

    public Task<DataOperationResult<byte[]>> GetFile(string fileName)
    {
        try
        {
            // Console.Error.WriteLine("Searching: '{0}', please wait . . .", rootDir);
            byte[] fileContents = File.ReadAllBytes($@"{rootDir}/{fileName}");

            return Task.FromResult(DataOperationResult<byte[]>.Success(fileContents));
        }
        catch (Exception ex)
        {
            return Task.FromResult(DataOperationResult<byte[]>.Failure(ex?.InnerException?.ToString() ?? ex.ToString()));
        }
    }


    public Task<DataOperationResult<string>> AddFile(byte[] contents, string filePrefix = "")
    {
        try
        {
            var fileName = DateTime.Now.GetHashCode().ToString("X");

            File.WriteAllBytes($@"{rootDir}/{fileName}", contents);

            return Task.FromResult(DataOperationResult<string>.Success(fileName));
        }
        catch (Exception ex)
        {
            return Task.FromResult(DataOperationResult<string>.Failure(ex?.InnerException?.ToString() ?? ex.ToString()));
        }
    }
}