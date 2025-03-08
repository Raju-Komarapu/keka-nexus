using Nexus.Core.Models;
using System.ComponentModel.DataAnnotations;

namespace Nexus.Application.DTO;

public class CandidateProfileDto
{
    public int Id { get; set; }

    [Required]
    public string FirstName { get; set; }

    public string? MiddleName { get; set; } // Optional

    [Required]
    public string LastName { get; set; }

    [Required]
    [EmailAddress] // Ensures proper email format
    public string Email { get; set; }

    [Required]
    [Phone] // Ensures proper phone format
    public string Phone { get; set; }

    public DateTime? DateOfBirth { get; set; }

    public string? ExpectedSalary { get; set; } // Optional

    public string? CurrentSalary { get; set; } // Optional

    public Address? Address { get; set; }

    public string? CurrentLocation { get; set; } // Optional

    public PreferredLocation PreferredLocation { get; set; }

    public IEnumerable<ExperienceDetails> Experience { get; set; } = new List<ExperienceDetails>(); // Required (can be empty)

    public IEnumerable<EducationDetails> Education { get; set; } = new List<EducationDetails>(); // Required (can be empty)

    public string? ResumeLocation { get; set; } // Optional
}
