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

    public EmailService(IConfiguration configuration)
    {
      _configuration = configuration;
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
        Text = $"Please click the link below to complete your registration: https://localhost:3000/register/{token}"
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