using Nexus.Application.Services;
using Nexus.Core.Models;
using System.Security.Claims;

namespace Nexus.WebAPI.Core;

public class RequestContextBuilder
{
    public IHttpContextAccessor HttpContextAccessor { get; }

    public ContextService ContextService { get; }

    public RequestContextBuilder(
        IHttpContextAccessor httpContextAccessor, 
        ContextService contextService)
    {
        this.HttpContextAccessor = httpContextAccessor;
        this.ContextService = contextService;
    }

    public IRequestContext Build()
    {
        var identity = this.HttpContextAccessor?.HttpContext?.User?.Identity as ClaimsIdentity;
        if (identity?.IsAuthenticated ?? false)
        {
            var user = this.ContextService.GetUserByIdentifier(identity?.Claims?.SingleOrDefault(c => c.Type == "UserIdentifier")?.Value);

            return new RequestContext()
            {
                UserId = user.Id,
                Email = user.Username,
                UserIdentifier = user.Identifier,
                ProfileId = user.ProfileId,
                DisplayName = this.ContextService.GetDisplayName(user.ProfileId)
            };
        }

        this.HttpContextAccessor.HttpContext.Response.StatusCode = StatusCodes.Status401Unauthorized;
        this.HttpContextAccessor.HttpContext.Response.HttpContext.Abort();
        return null;
    }
}
