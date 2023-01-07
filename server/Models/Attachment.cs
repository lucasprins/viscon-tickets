using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server.Enums;

namespace server.Models
{
    public class Attachment
    {
        public Guid Id { get; set; }
        public Guid TicketId { get; set; }
        public string URL { get; set; } = null!;
        public string Key { get; set; } = null!;
        public AttachmentType Type { get; set; }

        public Ticket Ticket { get; set; } = null!;
    }
}