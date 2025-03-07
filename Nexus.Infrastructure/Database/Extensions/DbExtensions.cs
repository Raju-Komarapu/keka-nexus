using Nexus.Infrastructure.Database.DbModels;

namespace Nexus.Infrastructure.Database.Extensions;

internal static class DbExtensions
{
    internal static void SetFieldsOnCreate(this DbBaseModel modelObject)
    {
        modelObject.CreatedOn = DateTime.UtcNow;
        modelObject.ModifiedOn = DateTime.UtcNow;
    }

    internal static void SetFieldsOnUpdate(this DbBaseModel modelObject)
    {
        modelObject.ModifiedOn = DateTime.UtcNow;
    }
}
