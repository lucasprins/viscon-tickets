using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class GetTicketsDTO
    {
        public List<GetTicketDTO> Tickets { get; set; } = null!;
        public int TotalTickets { get; set; }
        public int OpenTickets { get; set; }
        public int YourTickets { get; set; }
    }
}