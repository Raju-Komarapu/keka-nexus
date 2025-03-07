using Microsoft.AspNetCore.Mvc;
using Nexus.Core.Models;
using Nexus.WebAPI.Controllers;

namespace nexus_api.Controllers;

[Route("api/context")]
public class ContextController : BaseController
{
    private readonly IRequestContext RequestContext;
    public ContextController(IRequestContext requestContext)
    {
        this.RequestContext = requestContext;
    }

    [HttpGet]
    public IRequestContext GetContext()
    {
        return this.RequestContext;
    }
}
