using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class AddTicketSolutionDTO
    {
        public Guid TicketId { get; set; }
        public string Solution { get; set; } = string.Empty;
    }
}