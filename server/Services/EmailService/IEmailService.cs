using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Services.EmailService
{
    public interface IEmailService
    {
        Task SendRegisterEmail(string email, string token);
        Task SendNewTicketEmail(Ticket ticket);
    }
}