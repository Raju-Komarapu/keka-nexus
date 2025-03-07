using Nexus.Application.Services.Interfaces;
using Nexus.Core.Models;
using Nexus.Core.Repositories;

namespace Nexus.Application.Services
{
    public class DummyService : ServiceBase, IDummyService
    {
        public IRequestContext RequestContext { get; set; }

        public IDummyRepository DummyRepository { get; set; }

        public DummyService(IRequestContext context, IDummyRepository dummyRepository) : base(context)
        {
            this.RequestContext = context;
            this.DummyRepository = dummyRepository;
        }
        public IRequestContext Get(int x, int u)
        {
            var k = x + u;
            var all = this.DummyRepository.GetAllData();
            return this.RequestContext;
        }
    }
}
