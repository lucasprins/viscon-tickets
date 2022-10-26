using System.Text.Json.Serialization;

namespace server.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Status
    {
        Open = 1,
        InProgress = 2,
        Resolved = 3,
        Cancelled = 4
    }
}