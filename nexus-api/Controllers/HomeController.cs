using Microsoft.AspNetCore.Mvc;
using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;

namespace nexus_api.Controllers;

[ApiController]
[Route("dummy")]
public class HomeController : ControllerBase
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
