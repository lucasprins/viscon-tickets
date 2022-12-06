using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class CancelTicketDTO
    {
        public Guid TicketId { get; set; }
        public string CancelReason { get; set; } = null!;
    }
}