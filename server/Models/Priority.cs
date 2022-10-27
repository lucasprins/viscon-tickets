using System.Text.Json.Serialization;

namespace server.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Priority
    {
        Critical = 1,
        High = 2,
        Medium = 3,
        Low = 4
    }
}