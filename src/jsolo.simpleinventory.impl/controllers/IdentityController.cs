using jsolo.simpleinventory.impl.identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace jsolo.simpleinventory.impl.controllers
{
    [ApiController]
    public class IdentityController : AuthorizePermissionsBaseController
    {
        private readonly SignInManager<User> _signInManager;

        public IdentityController(
            UserManager<User> userManager,
            RoleManager<UserRole> roleManager,
            SignInManager<User> signInManager
    ) : base(userManager, roleManager)
        {
            _signInManager = signInManager;
        }

        protected SignInManager<User> SignInManager => _signInManager;
    }
}
