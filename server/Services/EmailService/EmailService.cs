using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using MailKit.Net.Smtp;
using MimeKit;

namespace server.Services.EmailService
{
  public class EmailService : IEmailService
  {

    private readonly IConfiguration _configuration;
    private readonly DataContext _context;

    public EmailService(IConfiguration configuration, DataContext dataContext)
    {
      _configuration = configuration;
      _context = dataContext;
    }

    public async Task SendNewTicketEmail(Ticket ticket)
    {
      var visconEmployees = await _context.Users.Where(u => u.Company.Name.Contains("Viscon")).ToListAsync();
      var company = await _context.Companies.FindAsync(ticket.CompanyId);

      var mail = new MimeMessage();
      mail.From.Add(MailboxAddress.Parse(_configuration.GetSection("EmailAddress").Value));
      
      foreach(var employee in visconEmployees) {
        mail.To.Add(MailboxAddress.Parse(employee.Email));
      }

      mail.Subject = $"New Ticket: {ticket.TicketNumber} by {company?.Name}";
      mail.Body = new TextPart("plain")
      {
        Text = $"A new ticket has been created. You can view it at http://localhost:3000/tickets/{ticket.Id}"
      };

      using (var client = new SmtpClient())
      {
        await client.ConnectAsync(
            _configuration.GetSection("EmailHost").Value,
            int.TryParse(_configuration.GetSection("EmailPort").Value, System.Globalization.NumberStyles.Number, System.Globalization.CultureInfo.InvariantCulture, out int port) ? port : 587,
            MailKit.Security.SecureSocketOptions.StartTls);

        await client.AuthenticateAsync(_configuration.GetSection("EmailAddress").Value, _configuration.GetSection("EmailPassword").Value);

        await client.SendAsync(mail);
        await client.DisconnectAsync(true);
      }
    }

    public async Task SendRegisterEmail(string email, string token)
    {
      System.Console.WriteLine("Sending email to " + email);

      var mail = new MimeMessage();
      mail.From.Add(MailboxAddress.Parse(_configuration.GetSection("EmailAddress").Value));
      mail.To.Add(MailboxAddress.Parse(email));
      mail.Subject = "Viscon Registration";
      mail.Body = new TextPart("plain")
      {
        Text = $"Please click the link below to complete your registration: http://localhost:3000/register?token={token}"
      };

      using (var client = new SmtpClient())
      {
        await client.ConnectAsync(
            _configuration.GetSection("EmailHost").Value,
            int.TryParse(_configuration.GetSection("EmailPort").Value, System.Globalization.NumberStyles.Number, System.Globalization.CultureInfo.InvariantCulture, out int port) ? port : 587,
            MailKit.Security.SecureSocketOptions.StartTls);

        await client.AuthenticateAsync(_configuration.GetSection("EmailAddress").Value, _configuration.GetSection("EmailPassword").Value);

        await client.SendAsync(mail);
        await client.DisconnectAsync(true);
      }
    }
  }
}