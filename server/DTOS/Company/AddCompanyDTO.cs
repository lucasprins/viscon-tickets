using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class AddCompanyDTO
    {
        public string Name { get; set; } = null!;
        public string Country { get; set; } = null!;
    }
}