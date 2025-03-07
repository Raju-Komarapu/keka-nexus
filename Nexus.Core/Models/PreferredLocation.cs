using Nexus.Core.Models.Enums;

namespace Nexus.Core.Models;

public class PreferredLocation
{
    public bool WillingToRelocate { get; set; }

    public PreferredModeOfWorking PreferredModeOfWorking { get; set; }

    public string LocationName { get; set; }
}
