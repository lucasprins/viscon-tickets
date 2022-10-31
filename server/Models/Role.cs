using System.Text.Json.Serialization;

namespace server.Models
{
    [JsonConverter(typeof(JsonStringEnumConverter))]
    public enum Role
    {
        VisconEmployee = 1,     // Kan alles behalve nieuwe users aanmaken en klanten toevoegen
        VisconAdmin = 2,        // Kan alles wat een viscon medewerker kan en klanten toevoegen/users aanmaken
        CustomerEmployee = 3,   // Kan alles behalve nieuwe users aanmaken
        CustomerAdmin = 4       // Kan alles wat een klant medewerker kan en nieuwe users aanmaken
    }
}