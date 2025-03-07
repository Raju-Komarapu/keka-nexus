using System.ComponentModel.DataAnnotations;

namespace Nexus.Infrastructure.Database.DbModels;
internal class DbUser : DbBaseModel
{
    [Key]
    public int Id { get; set; }
    public Guid Identifier { get; set; }
    public string UserName { get; set; }
    public string PasswordHash { get; set; }
    public int ProfileId { get; set; }
}