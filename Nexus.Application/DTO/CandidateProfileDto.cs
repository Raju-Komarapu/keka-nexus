using Nexus.Core.Models;

namespace Nexus.Application.DTO;

public class CandidateProfileDto
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string ExpectedSalary { get; set; }
    public string CurrentSalary { get; set; }
    public Address Address { get; set; }
    public string CurrentLocation { get; set; }
    public PreferredLocation PreferredLocation { get; set; }
    public IEnumerable<ExperienceDetails> Experience { get; set; }
    public IEnumerable<EducationDetails> Education { get; set; }
    public string ResumeLocation { get; set; }
}
