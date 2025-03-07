namespace Nexus.Core.Models;
public class CandidateProfile
{
    public int Id { get; set; }
    public string Identifier { get; set; } = Guid.NewGuid().ToString();  // UniqueIdentifier equivalent in C#
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public DateTime? DateOfBirth { get; set; }  // Nullable DateTime
    public string ExpectedSalary { get; set; }
    public string CurrentSalary { get; set; }
    public string Address { get; set; }
    public string CurrentLocation { get; set; }
    public string PreferredLocation { get; set; }
    public string Experience { get; set; }
    public string Education { get; set; }
    public string ResumeLocation { get; set; }
    public DateTime CreatedOn { get; set; } = DateTime.UtcNow;  // Default to UTC current time
    public DateTime ModifiedOn { get; set; } = DateTime.UtcNow;  // Default to UTC current time
}
}
