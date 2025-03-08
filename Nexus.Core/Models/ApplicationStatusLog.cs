using Nexus.Core.Models.Enums;

namespace Nexus.Core.Models;
public class ApplicationStatusLog
{
    public ApplicationStatus Status { get; set; }

    public bool IsCompleted{ get; set; }

    public DateTime CompletedOn{ get; set; }
}
