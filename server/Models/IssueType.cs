using System.Text.Json.Serialization;

namespace server.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum IssueType
    {
        Hardware = 1,
        Software = 2,
        Other = 3,
    }
}