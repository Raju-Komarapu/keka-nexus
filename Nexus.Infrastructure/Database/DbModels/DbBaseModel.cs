﻿namespace Nexus.Infrastructure.Database.DbModels
{
    internal abstract class DbBaseModel
    {
        public DateTime CreatedOn { get; set; }

        public DateTime ModifiedOn { get; set; }
    }
}
