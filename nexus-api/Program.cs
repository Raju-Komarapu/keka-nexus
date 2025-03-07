using Microsoft.OpenApi.Models;
using Nexus.WebAPI.Core;
using SimpleInjector;
using SimpleInjector.Lifestyles;
using Swashbuckle.AspNetCore.Filters;

var builder = WebApplication.CreateBuilder(args);
var container = new Container();
// Add services to the container.
container.Options.DefaultScopedLifestyle = new AsyncScopedLifestyle();
container.Options.ResolveUnregisteredConcreteTypes = true;
container.Options.EnableAutoVerification = false;
container.Options.SuppressLifestyleMismatchVerification = true;

builder.Services.AddControllerConfiguration()
                .AddSimpleInjector(container)
                .AddAutomapperConfig()
                .AddAuthenticationDetails(container);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization Header using Bearer Scheme(\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });
    options.OperationFilter<SecurityRequirementsOperationFilter>();
});

var app = builder.Build(container);
app.UseCors("AllowAll");
app.UseRouting();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
