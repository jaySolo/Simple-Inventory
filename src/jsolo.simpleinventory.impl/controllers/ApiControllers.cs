using jsolo.simpleinventory.impl.identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;



namespace jsolo.simpleinventory.impl.controllers;


// [Authorize]
[ApiController]
[Route("api/[controller]")]
public class ApiController : BaseController
{
}



[ApiController]
[Route("api/data/[controller]")]
public class ApiDataController : AuthorizePermissionsBaseController
{
    public ApiDataController(UserManager<User> userManager, RoleManager<UserRole> roleManager) : base(userManager, roleManager)
    {
    }
}



[ApiController]
[Route("api/stats/[controller]")]
public class ApiStatsController : AuthorizePermissionsBaseController
{
    public ApiStatsController(UserManager<User> userManager, RoleManager<UserRole> roleManager) : base(userManager, roleManager)
    {
    }
}



[ApiController]
// [Route("files/[controller]")]
[Route("api/files/[controller]")]
public class ApiFileController : AuthorizePermissionsBaseController
{
    public ApiFileController(
        UserManager<User> userManager,
        RoleManager<UserRole> roleManager
    ) : base(userManager, roleManager) { }
}
