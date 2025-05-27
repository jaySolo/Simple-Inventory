using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace jsolo.simpleinventory.sys.common.interfaces;



public interface IFileHandlerService
{
    Task<DataOperationResult<byte[]>> GetFile(string name);

    Task<DataOperationResult<string>> AddFile(byte[] contents, string filePrefix = "");
}
