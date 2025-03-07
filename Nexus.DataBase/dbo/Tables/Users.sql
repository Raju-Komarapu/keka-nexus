CREATE TABLE Users (
    Id              INT IDENTITY(1,1) PRIMARY KEY,                 
    Identifier      UNIQUEIDENTIFIER    NOT NULL,                    
    Username        NVARCHAR(128)       NOT NULL,       
    PasswordHash    NVARCHAR(128)       NULL,
	ProfileId       INT                 NOT NULL,
	CreatedOn       DATETIME            NOT NULL DEFAULT(GETUTCDATE()),
	ModifiedOn      DATETIME            NOT NULL DEFAULT(GETUTCDATE())
);