using System;
using System.Collections.Generic;


namespace jsolo.simpleinventory.sys.models
{
    public class RoleViewModel
    {
        public string Name { get; set; } = string.Empty;

        public string Description { get; set; } = string.Empty;

        public bool HasAdminRights { get; set; } = false;

        public DateTime CreatedOn { get; set; }

        public DateTime? LastUpdatedOn { get; set; }

        public int UserCount { get; set; }
        
        public List<string> Permissions { get; set; } = new();
    }



    public class AddEditRoleViewModel : RoleViewModel
    {
        public string AdminPassword { get; set; } = string.Empty;
    }
}
