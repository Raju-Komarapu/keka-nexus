using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Nexus.WebAPI.Controllers;

[ApiController]
[Authorize(AuthenticationSchemes = "Bearer")]
public class BaseController : ControllerBase
{
}
