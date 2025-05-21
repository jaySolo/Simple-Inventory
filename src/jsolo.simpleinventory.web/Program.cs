using System.Text;
using System.Reflection;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.FileProviders;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;

using jsolo.simpleinventory.impl;
using jsolo.simpleinventory.impl.identity;
using jsolo.simpleinventory.impl.persistance;
using jsolo.simpleinventory.impl.persistance.configurations;
using jsolo.simpleinventory.sys;
using jsolo.simpleinventory.sys.common.interfaces;
using jsolo.simpleinventory.web;
using jsolo.simpleinventory.web.Configurations;
// using jsolo.simpleinventory.web.Hubs;
using jsolo.simpleinventory.web.Services;
// using jsolo.simpleinventory.web.TimerFeatures;
// using jsolo.simpleinventory.web.Repositories;



WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
// builder.WebHost.UseSentry();

#region services registration
builder.Services.AddControllers();

builder.Services.AddSwaggerGen(c =>
{
    c.ResolveConflictingActions(desc => desc.First());
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "jsolo.simpleinventory.api.web",
        Version = "v1.0.0",
        Description = "Web API for APUA Electricity BU SCADA Information Dashboard",
        TermsOfService = new Uri("https://example.com/terms"),
        Contact = new OpenApiContact
        {
            Name = "APUA Electricity BU SCADA Department",
            Email = "scada@apua.ag",
            // Url = new Uri("https://twitter.com/jwalkner"),
        },
        License = new OpenApiLicense
        {
            Name = "No License",
            // Url = new Uri("https://example.com/license"),
        }
    });

    var xmlFile = $"{Assembly.GetExecutingAssembly().GetName().Name}.xml";
    var xmlPath = Path.Combine(AppContext.BaseDirectory, xmlFile);
    c.IncludeXmlComments(xmlPath);
});

builder.Services.AddHealthChecks();

builder.Services.AddCors(opts =>
{
    opts.AddPolicy("SpaCorsPolicy", builder => builder
        .WithOrigins("http://localhost:5000")
        .AllowAnyHeader()
        .AllowAnyMethod()
        .AllowCredentials());
});

builder.Services.AddSignalR(opts =>
{
    opts.EnableDetailedErrors = true;
});

builder.Services.AddSpaStaticFiles(c =>
{
    c.RootPath = "www/dist";
});

// builder.Services.AddSingleton<IDataRepository, DataRepository>();
// builder.Services.AddSingleton<TimerManger>();


// configure strongly typed settings objects
var appSettingsSection = builder.Configuration.GetSection("AppSettings");
builder.Services.Configure<AppSettings>(appSettingsSection);

builder.Services.AddScoped<ICurrentUserService, CurrentUserService>();

builder.Services.AddSystem().AddInfrastructure(builder.Configuration);

// configure jwt authentication
var appSettings = appSettingsSection.Get<AppSettings>();
var key = Encoding.ASCII.GetBytes(appSettings.Secret);
builder.Services.AddAuthentication(x =>
{
    x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuerSigningKey = true,
        IssuerSigningKey = new SymmetricSecurityKey(key),
        ValidateIssuer = false,
        ValidateAudience = false
    };
});


// configure DI for application services
builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddAuthorization(opts =>
{
    opts.AddPolicy(Policies.AllowDevelopers, policy => policy.RequireClaim(
        Claims.Developer.Type,
        Claims.Developer.Value
    ));

    opts.AddPolicy(Policies.AllowSystemAdmins, policy => policy.RequireClaim(
        Claims.Administrator.Type,
        Claims.Administrator.Value
    ));

    opts.AddPolicy(Policies.AllowAuthenticatedUsers, policy => policy.RequireAuthenticatedUser());
});
#endregion


WebApplication app = builder.Build();

// app.UseSentryTracing();

#region application configuration
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    // app.UseDatabaseErrorPage();
}
else
{
    app.UseExceptionHandler("/Error");

    // The default HSTS value is 30 days. You may want to change this
    // for production scenarios, see https://aka.ms/aspnetcore-hsts.
    // app.UseHsts();

    app.UseStaticFiles(new StaticFileOptions
    {
        FileProvider = new PhysicalFileProvider(
            Path.Combine(app.Environment.ContentRootPath, "www//dist//assets")
        ),
        RequestPath = "/assets"
    });
}

// app.UseHttpsRedirection();

app.UseRouting();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger(c =>
    {
        c.RouteTemplate = "api/docs/{documentname}.json";
    });

    app.UseSwaggerUI(c =>
    {   
        // c.SwaggerEndpoint("/swagger/v1/swagger.json", name: "Version 0.0.1");
        c.SwaggerEndpoint("/api/docs/v1.json", name: "Version 1.0.0");
        // c.SwaggerEndpoint("/api/docs/v1/swagger.json", name: "Version 0.0.0");
        // c.SwaggerEndpoint("/api/docs/v2/swagger.json", name: "Version 2.0.0");
        c.RoutePrefix = "api/docs";
    });
}

app.UseHealthChecks("/system/health");

// global cors policy
app.UseCors(opts => opts.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

app.UseAuthentication();
app.UseAuthorization();
    
var assembly = Assembly.GetEntryAssembly();
var appVersionInfo = System.Diagnostics.FileVersionInfo.GetVersionInfo(assembly?.Location ?? string.Empty);

app.UseEndpoints(endpoints =>
{
    endpoints.MapGet("/system/about", async context =>
    {
        var appInfo = assembly?.GetName();
        
        context.Response.Headers.Add("Accept", "application/json");
        context.Response.Headers.Add("Content-Type", "application/json");

        await context.Response.Body.WriteAsync(System.Text.Json.JsonSerializer
            .SerializeToUtf8Bytes(new
            {
                Name = appVersionInfo.ProductName,
                ProductVersion = appVersionInfo?.ProductVersion ?? "N/A",
                AssemblyVersion = appInfo?.Version?.ToString(),
                Copyright = appVersionInfo?.LegalCopyright,
                Company = appVersionInfo?.CompanyName
            })
        );
    });

    endpoints.MapGet("/system", async context =>
    {
        await context.Response.Body.WriteAsync(Encoding.ASCII.GetBytes(
            $"{appVersionInfo?.ProductName ?? "App"} is running."
        ));
    });

    endpoints.MapControllers();
    // endpoints.MapHub<DataHub>("/data");
});


app.UseStaticFiles();
app.UseSpaStaticFiles();

app.UseSpa(spa =>
{
    // To learn more about options for serving an Angular SPA from ASP.NET Core,
    // see https://go.microsoft.com/fwlink/?linkid=864501

    spa.Options.SourcePath = "www";

    if (app.Environment.IsDevelopment())
    {
        // spa.UseAngularCliServer(npmScript: "start");
        spa.UseProxyToSpaDevelopmentServer("http://localhost:5000");
    }
});
#endregion

#region database migration

bool should_print_to_console = Environment.UserInteractive && !Console.IsInputRedirected,
    should_migrate_db = STARTUP_OPTIONS_CHECKER.MIGRATE_DATABASE(args),
    should_seed_db = STARTUP_OPTIONS_CHECKER.ATTEMPT_SEED_DATABASE(args, should_migrate_db);

if (should_migrate_db)
{
    try
    {
        Console.Out.WriteLine("Starting Database Migration...");

        var env = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT")?.ToLower() ?? "";

        var result = await DatabaseMigrator.EnsureDatabaseCreatedAsync(NHibernateConfig.GenerateMySqlConfiguration(
            app.Configuration.GetConnectionString("DbConnection"))
        );

        if (result.Succeeded == true || result.AlreadyExists == true)
        {
            Console.Out.WriteLine("Database migration completed successfully!");
        }
        else if (result.IsPartiallySuccessful == true)
        {
            Console.Out.WriteLine("Database migration was not 100% successful. Some changes were not made.");
        }
        else if (result.Errors.Length > 0)
        {
            Console.Error.WriteLine("Database migration did not complete successfully, see details below . . .");
            foreach (string error in result.Errors)
            {
                Console.Error.WriteLine(error);
            }
        }

    }
    catch (Exception ex)
    {
        Console.Error.WriteLine("An error has occurred while starting the applicaton. See details below . . .");
        Console.Error.WriteLine(ex);
    }
}


if (should_seed_db)
{
    // TODO: add seeding data logic here
}
#endregion


if (STARTUP_OPTIONS_CHECKER.LAUNCH_APP(args, should_migrate_db))
{
    app.Run();
}
else if (should_print_to_console)
{
    Console.WriteLine("Press any key to continue...");
    Console.ReadKey();
}
