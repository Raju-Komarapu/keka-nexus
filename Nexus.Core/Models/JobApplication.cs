using Nexus.Core.Models.Enums;

namespace Nexus.Core.Models;

public class JobApplication
{
    public int Id { get; set; }
    public Guid Identifier { get; set; } = Guid.NewGuid();
    public int JobId { get; set; }
    public string TenantId { get; set; }
    public int ProfileId { get; set; }
    public ApplicationStatus ApplicationStatus { get; set; }
    public DateTime AppliedOn { get; set; }
}
