CREATE TABLE JobApplication (
    Id					INT IDENTITY(1,1) PRIMARY KEY,                 
    Identifier			UNIQUEIDENTIFIER	NOT NULL,                    
    JobId				INT					NOT NULL, 
	TenantId			VARCHAR(64)			NULL,
    ProfileId			INT					NULL,
	ApplicationStatus	SMALLINT			NOT NULL,
	ApplicationStatusLog NVARCHAR(MAX)		NULL,
	AppliedOn			DATETIME			NOT NULL DEFAULT(GETUTCDATE()),
	CreatedOn			DATETIME			NOT NULL DEFAULT(GETUTCDATE()),
	ModifiedOn			DATETIME			NOT NULL DEFAULT(GETUTCDATE())
);