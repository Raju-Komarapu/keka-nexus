using Microsoft.AspNetCore.Mvc;
using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;
using Nexus.WebAPI.Controllers;

namespace nexus_api.Controllers;

[ApiController]
[Route("dummy")]
public class HomeController : BaseController
{
    public IDummyService DummyService { get; set; }
    public HomeController(IDummyService dummyService)
    {
        this.DummyService = dummyService;
    }

    [HttpGet("get")]
    public IRequestContext Get()
    {
        return this.DummyService.Get(2, 3);
    }
}
