using System;
using System.Collections.Generic;

namespace jsolo.simpleinventory.sys.models
{
    public class PermissionViewModel
    {
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public string Route { get; set; } = string.Empty;

        public List<string> AcceptedMethods { get; set; } = new();

        public DateTime CreatedOn { get; set; }

        public DateTime? LastUpdatedOn { get; set; }
        
        public List<string> Roles { get; set; } = new();
    }


    public class AddEditPermissionViewModel : PermissionViewModel
    {
        public string AdminPassword { get; set; } = string.Empty;
    }
}
