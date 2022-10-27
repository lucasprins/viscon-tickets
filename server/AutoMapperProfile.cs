using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using server.DTOS;

namespace server
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            CreateMap<Company, GetCompanyDTO>();
            CreateMap<AddCompanyDTO, Company>();
            CreateMap<UpdateCompanyDTO, Company>();
            
            CreateMap<User, GetUserDTO>();
            CreateMap<User, GetTicketUserDTO>();

            CreateMap<CreateTicketDTO, Ticket>();
            CreateMap<Ticket, GetTicketDTO>();
        }
    }
}