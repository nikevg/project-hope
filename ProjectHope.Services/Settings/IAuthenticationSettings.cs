namespace ProjectHope.Services.Settings
{
  public interface IAuthenticationSettings
  {
    string Key { get; set; }

    string Issuer { get; set; }

    int ExpireDays { get; set; }
  }
}