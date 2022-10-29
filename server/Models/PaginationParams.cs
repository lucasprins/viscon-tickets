using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace server.Models
{
    public class PaginationParams
    {
        private int _maxPageSize = 10;
        private int _PageSize;
        public int Page { get; set; } = 1;
        public int PageSize
        {
            get => _PageSize;
            set => _PageSize = (value > _maxPageSize) ? _maxPageSize : value;
        }
    }
}