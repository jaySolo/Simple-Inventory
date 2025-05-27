namespace jsolo.simpleinventory.web.Configurations;



public class AppSettings
{
    public string Secret { get; set; } = "";

    public string StorageMode { get; set; } = "";

    public string StorageLocation { get; set; } = "";
    
    public string StorageCloudEndpoint { get; set; } = "";
    
    public string StorageCloudKeyAccess { get; set; } = "";
    
    public string StorageCloudKeySecret { get; set; } = "";
}
