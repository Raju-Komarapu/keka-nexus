using Nexus.Core.Models;

namespace Nexus.WebAPI.Core;

public class RequestContextBuilder
{
    public RequestContextBuilder(IHttpContextAccessor httpContextAccessor)
    {
        this.HttpContextAccessor = httpContextAccessor;
    }

    public IHttpContextAccessor HttpContextAccessor { get; }

    public IRequestContext Build()
    {
        var k = this.HttpContextAccessor;
        return new RequestContext()
        {
            UserId = 1,
            UserName = "user",
            Password = "password",
            Token = "token"
        };
    }
}
