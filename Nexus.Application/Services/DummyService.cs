using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;

namespace Nexus.Application.Services
{
    public class DummyService : ServiceBase, IDummyService
    {
        public IRequestContext RequestContext { get; set; }

        public DummyService(IRequestContext context) : base(context)
        {
            this.RequestContext = context;
        }
        public IRequestContext Get(int x, int u)
        {
            var k = x + u;
            return this.RequestContext;
        }
    }
}
