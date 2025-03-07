using Nexus.WebAPI.Core;
using SimpleInjector;
using SimpleInjector.Lifestyles;

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
                .AddAuthenticationDetails();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
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
