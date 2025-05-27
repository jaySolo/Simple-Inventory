using jsolo.simpleinventory.impl.controllers;
using jsolo.simpleinventory.impl.identity;
using jsolo.simpleinventory.sys.models;
using jsolo.simpleinventory.sys.queries.Media;

using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;


namespace jsolo.simpleinventory.web.Controllers.Api;



public class MediaController : ApiFileController
{
    public MediaController(
        UserManager<User> userManager,
        RoleManager<UserRole> roleManager
    ) : base(userManager, roleManager) { }


    // GET: media/5
    [Route("{id}")]
    [HttpGet]
    public async Task<IActionResult> GetMedium(string id)
    {


        var medium = await Mediator.Send(new GetMediumQuery
        {
            Id = id
        });

        if (medium != null)
        {
            return Ok(new { medium = System.Text.Encoding.Default.GetString(medium) });
        }
        return NotFound(new { medium = "No signature with the specified id was found" });
    }
    
}
