namespace Nexus.Core.Models;

public class Address
{
    public string AddressLine1 { get; set; }
    public string? AddressLine2 { get; set; }
    public string CountryCode { get; set; }
    public string City { get; set; }
    public string State { get; set; }
    public string Zip { get; set; }
    public string CountryName { get; set; }
}
