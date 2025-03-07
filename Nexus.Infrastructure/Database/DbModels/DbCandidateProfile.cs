using System.ComponentModel.DataAnnotations;

namespace Nexus.Infrastructure.Database.DbModels;

internal class DbCandidateProfile: DbBaseModel
{
    [Key]
    public int Id { get; set; }
    public Guid Identifier { get; set; }
    public string FirstName { get; set; }
    public string MiddleName { get; set; }
    public string LastName { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public DateTime? DateOfBirth { get; set; }
    public string ExpectedSalary { get; set; }
    public string CurrentSalary { get; set; }
    public string Address { get; set; }
    public string CurrentLocation { get; set; }
    public string PreferredLocation { get; set; }
    public string Experience { get; set; }
    public string Education { get; set; }
    public string ResumeLocation { get; set; }
}
