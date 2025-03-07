using Nexus.Core.Models;
using Nexus.WebAPI.Core;
using SimpleInjector;

namespace Nexus.WebAPI;

public class SimpleInjectorBootstrap
{
    public static void Initialize(Container container, IConfiguration configuration)
    {
        container.Register<IHttpContextAccessor, HttpContextAccessor>(Lifestyle.Singleton);
        container.Register<IRequestContext>(() => container.GetInstance<RequestContextBuilder>().Build(), Lifestyle.Scoped);
    }
}
