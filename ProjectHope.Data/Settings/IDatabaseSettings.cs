namespace ProjectHope.Data.Settings
{
  public interface IDatabaseSettings
  {
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
  }
}
