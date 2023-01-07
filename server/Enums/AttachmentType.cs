using System.Text.Json.Serialization;

namespace server.Enums
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum AttachmentType
    {
        TicketCreated = 1,
        TicketUpdated = 2,
        TicketSolution = 3
    }
}