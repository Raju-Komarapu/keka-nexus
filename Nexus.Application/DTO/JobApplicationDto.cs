using Nexus.Core.Models.Enums;

namespace Nexus.Application.DTO;

public class JobApplicationDto
{
    public int Id { get; set; }
    public int JobId { get; set; }
    public string TenantId { get; set; }
    public ApplicationStatus ApplicationStatus { get; set; }
}
