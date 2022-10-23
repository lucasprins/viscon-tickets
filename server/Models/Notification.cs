using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Notification
    {
        public Guid Id { get; set; }
        public string Message { get; set; } = null!;
        public DateTime CreationDate { get; set; }
        public bool IsRead { get; set; }

        public Guid UserId { get; set; }

        public User User { get; set; } = null!;
    }
}