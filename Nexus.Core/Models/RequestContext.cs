﻿namespace Nexus.Core.Models;

public class RequestContext : IRequestContext
{
    public int UserId { get; set; }
    public int ProfileId { get; set; }
    public string UserIdentifier { get; set; }
    public string DisplayName { get; set; }
    public string Email { get; set; }
    public bool IsProfileUpdated { get; set; }
}
