namespace ProjectHope.Data.Models
{
  public class Result<T>
  {
    public long Count { get; set; }

    public T Data { get; set; }
  }
}