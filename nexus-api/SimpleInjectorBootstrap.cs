using Nexus.Application.Services;
using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;
using Nexus.Core.Repositories;
using Nexus.Infrastructure.Database;
using Nexus.Infrastructure.Database.Repositories;
using Nexus.WebAPI.Core;
using SimpleInjector;

namespace Nexus.WebAPI;

public class SimpleInjectorBootstrap
{
    public static void Initialize(Container container, IConfiguration configuration)
    {
        container.Register<IHttpContextAccessor, HttpContextAccessor>(Lifestyle.Singleton);
        container.Register<IRequestContext>(() => container.GetInstance<RequestContextBuilder>().Build(), Lifestyle.Scoped);
        container.Register<DatabaseContext>(() => new DatabaseContext(configuration.GetConnectionString("Default")), Lifestyle.Scoped);

        container.Register<IAuthService, AuthService>(Lifestyle.Scoped);
        container.Register<IUserRepository, UserRepository>(Lifestyle.Scoped);
        container.Register<ICandidateProfileRepository, CandidateProfileRepository>(Lifestyle.Scoped);
        container.Register<ICandidateProfileService, CandidateProfileService>(Lifestyle.Scoped);
        container.Register<IJobApplicationRepository, JobApplicationRepository>(Lifestyle.Scoped);
        container.Register<IJobApplicationService, JobApplicationService>(Lifestyle.Scoped);
    }
}
