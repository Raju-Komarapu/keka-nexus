﻿using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Nexus.Application;
using Nexus.Infrastructure;
using SimpleInjector;
using System.Text;

namespace Nexus.WebAPI.Core;

public static class ServiceCollectionExtensions
{
    public static WebApplication Build(this WebApplicationBuilder builder, Container container)
    {
        builder.Services.AddControllersWithViews();

        var app = builder.Build();
        SimpleInjectorInitiailzer.Initialize(container, builder.Configuration);
        app.Services.UseSimpleInjector(container);
        return app;
    }

    public static IServiceCollection AddControllerConfiguration(this IServiceCollection services)
    {
        services.AddControllers();
        services.AddControllersWithViews();
        return services;
    }

    public static IServiceCollection AddSimpleInjector(this IServiceCollection services, Container container)
    {
        services.AddSimpleInjector(container, options =>
        {
            options.AddAspNetCore()
                   .AddControllerActivation();
            options.CrossWire<IServiceScopeFactory>();
        });

        return services;
    }

    public static IServiceCollection AddAutomapperConfig(this IServiceCollection services)
    {
        services.AddAutoMapper(options =>
        {
            options.AddProfile<DtoMapperProfile>();
            options.AddProfile<DataMapperProfile>();
        });
        return services;
    }

    public static IServiceCollection AddAuthenticationDetails(this IServiceCollection services, Container container)
    {
        services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
        {
            options.TokenValidationParameters = new Microsoft.IdentityModel.Tokens.TokenValidationParameters
            {
                ValidateIssuer = false,
                ValidateAudience = false,
                ValidateLifetime = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(container.GetInstance<IConfiguration>().GetValue<string>("JWT:SecretCode")))
            };
        });

        return services;
    }
}
