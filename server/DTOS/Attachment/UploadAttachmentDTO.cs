using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.DTOS
{
    public class UploadAttachmentDTO
    {
        public string URL { get; set; } = null!;
        public string Key { get; set; } = null!;
    }
}