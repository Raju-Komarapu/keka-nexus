namespace Nexus.Infrastructure.Database.DbModels
{
    class DbJobApplication : DbBaseModel
    {
        public int Id { get; set; }
        public Guid Identifier { get; set; }
        public int JobId { get; set; }
        public string TenantId { get; set; }
        public int ProfileId { get; set; }
        public short ApplicationStatus { get; set; }
        public string ApplicationStatusLog { get; set; }
        public DateTime AppliedOn { get; set; }
    }
}
