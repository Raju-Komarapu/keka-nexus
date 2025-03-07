using Nexus.Core.Models;

namespace Nexus.Application.Services.Interfaces;
public interface IDummyService
{
    IRequestContext Get(int x, int u);
}
