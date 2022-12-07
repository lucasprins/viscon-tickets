using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;

namespace server.Data
{
    public class DataSolution
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public DataSolution(DataContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<List<Solution>> GetSolutions()
        {
            return await _context.Solutions.ToListAsync();
        }
    }
}