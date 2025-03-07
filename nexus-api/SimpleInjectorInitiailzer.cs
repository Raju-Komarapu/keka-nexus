using SimpleInjector;

namespace Nexus.WebAPI;

public class SimpleInjectorInitiailzer
{
    public static void Initialize(Container container, IConfiguration configuration)
    {
        SimpleInjectorBootstrap.Initialize(container, configuration);
    }
}
