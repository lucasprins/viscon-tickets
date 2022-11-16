using System.Text.Json.Serialization;

namespace server.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum TokenType
    {
        REGISTER = 1,
    }
}