using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class Token
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public TokenType TokenType { get; set; }
        public Guid UserId { get; set; }
        public Guid TokenValue { get; set; }
        public DateTime CreationDate { get; set; }
        public DateTime ExpirationDate { get; set; }

        public User User { get; set; } = null!;
    }
}