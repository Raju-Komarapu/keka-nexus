using Nexus.Core.Models;

namespace Nexus.Application.Services;
public class ServiceBase
{
    public IRequestContext RequestContext;

    public ServiceBase(IRequestContext requestContext)
    {
        this.RequestContext = requestContext;
    }
}
