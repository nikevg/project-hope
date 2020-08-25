namespace ProjectHope.Services.Settings
{
  public class AuthenticationSettings : IAuthenticationSettings
  {
    public string Key { get; set; }

    public string Issuer { get; set; }

    public int ExpireDays { get; set; }
  }
}