using Nexus.Application.Services;
using Nexus.Core.Models;
using System.Security.Claims;

namespace Nexus.WebAPI.Core;

public class RequestContextBuilder
{
    public IHttpContextAccessor HttpContextAccessor { get; }
    public ContextService ContextService { get; }
    public RequestContextBuilder(IHttpContextAccessor httpContextAccessor, ContextService contextService)
    {
        this.HttpContextAccessor = httpContextAccessor;
        this.ContextService = contextService;
    }

    public IRequestContext Build()
    {
        var identity = this.HttpContextAccessor.HttpContext.User.Identities as ClaimsIdentity;
        this.ContextService.GetUserByIdentifier(identity?.Claims?.SingleOrDefault(c => c.Type == "UserIdentifier")?.Value);
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
