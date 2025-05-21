using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;


namespace jsolo.simpleinventory.sys.models
{
    public class ChangePasswordViewModel
    {
        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Current password")]
        public string OldPassword { get; set; } = string.Empty;

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; } = string.Empty;

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new and confirmation passwords do not match.")]
        public string ConfirmPassword { get; set; } = string.Empty;
    }


    public class ChangeUserPasswordViewModel
    {
        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "New password")]
        public string NewPassword { get; set; } = string.Empty;

        [DataType(DataType.Password)]
        [Display(Name = "Confirm new password")]
        [Compare("NewPassword", ErrorMessage = "The new and confirmation passwords do not match.")]
        public string ConfirmPassword { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        [Display(Name = "Administrator's password")]
        public string AdminPassword { get; set; } = string.Empty;
    }


    public class LoginViewModel
    {
        [Required]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; } = string.Empty;

        [Required]
        [DataType(DataType.Password)]
        public string Password { get; set; } = string.Empty;
    }


    public class UserIdentityStatusViewModel
    {
        public int? Id { get; protected set; } = null;

        public string FirstName { get; protected set; }

        public string LastName { get; protected set; }

        public string Username { get; protected set; }

        public string EmailAddress { get; protected set; }

        public bool IsEmailConfirmed { get; protected set; }

        public string PhoneNumber { get; protected set; }

        public bool IsPhoneConfirmed { get; protected set; }

        public bool IsLocked { get; protected set; }

        public string Position { get; protected set; }

        public DateTime? Birthday { get; protected set; }

        public DateTime CreatedOn { get; protected set; }

        public DateTime? LastUpdatedOn { get; protected set; }

        public virtual string Token { get; protected set; }

        public virtual string SessionId { get; protected set; }

        public bool Authenticated { get; protected set; }

        public bool IsAdministrator { get; protected set; } = false;

        public List<string> Roles { get; protected set; } = new List<string>();

        public List<PermissionViewModel> Permissions { get; protected set; }
            = new List<PermissionViewModel>();

        public UserIdentityStatusViewModel(
            int? id = null,
            string firstNames = "", string surname = "",
            string userName = "",
            string email = "", bool isEmailConfirmed = false,
            string phone = "", bool isPhoneConfirmed = false,
            bool islocked = false,
            string position = "",
            DateTime? birthday = null, DateTime? createdOn = null, DateTime? lastModifiedOn = null,
            string userToken = "", string userSessionId = "",
            bool isUserAuthenticated = false,
            string[]? userRoles = null
        )
        {
            Id = id;
            FirstName = firstNames;
            LastName = surname;
            Username = userName;
            EmailAddress = email;
            IsEmailConfirmed = isEmailConfirmed;
            PhoneNumber = phone;
            IsPhoneConfirmed = isPhoneConfirmed;
            IsLocked = islocked;
            Position = position;
            Birthday = birthday;
            CreatedOn = createdOn.GetValueOrDefault();
            LastUpdatedOn = lastModifiedOn;
            Token = userToken;
            SessionId = userSessionId;
            Authenticated = isUserAuthenticated;

            if (userRoles is not null) { Roles.AddRange(userRoles); }
        }


        public UserIdentityStatusViewModel SetAdminStatus(bool isAdmin)
        {
            IsAdministrator = isAdmin;

            return this;
        }


        public UserIdentityStatusViewModel DefinePermissions(params PermissionViewModel[] permissions)
        {
            if (permissions.Length > 0)
            {
                foreach (var permission in permissions)
                {
                    this.Permissions.Add(permission);
                }
            }

            return this;
        }
    }


    public class UserProfileViewModel
    {
        public int Id { get; set; }

        public string LastName { get; set; } = string.Empty;

        public string FirstName { get; set; } = string.Empty;

        public string EmailAddress { get; set; } = string.Empty;

        public bool IsEmailConfirmed { get; set; } = false;

        public string PhoneNumber { get; set; } = string.Empty;

        public bool IsPhoneConfirmed { get; set; } = false;

        public DateTime? Birthday { get; set; }

        public bool CanBeLockedOut { get; set; } = true;

        public bool IsLocked { get; set; } = false;

        public string Username { get; set; } = string.Empty;

        public string Position { get; set; } = string.Empty;

        public List<string> UserRoles { get; set; } = new();

        public DateTime CreatedOn { get; set; }

        public DateTime? LastUpdatedOn { get; set; }
    }


    public class AddEditUserViewModel : UserProfileViewModel
    {
        public string Password { get; set; } = string.Empty;

        public string AdminPassword { get; set; } = string.Empty;
    }
}
