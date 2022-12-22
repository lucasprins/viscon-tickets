global using server.Data;
global using server.Models;
global using server.DTOS;
global using Microsoft.EntityFrameworkCore;
using server.Services.CompanyService;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using server.Services.AuthService;
using server.Services.TicketService;
using server.Services.UserService;
using server.Services.TokenService;
using server.Services.MachineService;
using server.Services.IssuesService;
using server.Services.SolutionService;
using server.Services.EmailService;

internal class Program
{
  private static void Main(string[] args)
  {
    var builder = WebApplication.CreateBuilder(args);

    // Add services to the container.

    builder.Services.AddControllers();

    builder.Services.AddDbContext<DataContext>(optionsBuilder =>
        optionsBuilder
        .UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"))
        .LogTo(Console.WriteLine, LogLevel.Information));

    // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
    builder.Services.AddEndpointsApiExplorer();

    builder.Services.AddCors();

    builder.Services.AddHttpContextAccessor();

    builder.Services.AddSwaggerGen(options =>
    {
      options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
      {
        Description = "JWT Authorization header using the Bearer scheme.",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
      });
      options.OperationFilter<SecurityRequirementsOperationFilter>();
    });

    builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
        .AddJwtBearer(options =>
        {
          options.TokenValidationParameters = new TokenValidationParameters
          {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8
              .GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience = false
          };
        });

    builder.Services.AddAutoMapper(typeof(Program).Assembly);

    builder.Services.AddScoped<ICompanyService, CompanyService>();
    builder.Services.AddScoped<IAuthService, AuthService>();
    builder.Services.AddScoped<ITicketService, TicketService>();
    builder.Services.AddScoped<IUserService, UserService>();
    builder.Services.AddScoped<ITokenService, TokenService>();
    builder.Services.AddScoped<IMachineService, MachineService>();
    builder.Services.AddScoped<IIssueService, IssueService>();
    builder.Services.AddScoped<ISolutionService, SolutionService>();
    builder.Services.AddScoped<IEmailService, EmailService>();

    builder.Services.AddScoped<IDataIssue, DataIssue>();
    builder.Services.AddScoped<IDataSolution, DataSolution>();

    var app = builder.Build();

    // Configure the HTTP request pipeline.
    if (app.Environment.IsDevelopment())
    {
      app.UseSwagger();
      app.UseSwaggerUI();
    }

    app.UseCors(x => x
        .AllowAnyOrigin()
        .AllowAnyMethod()
        .AllowAnyHeader());

    // app.UseHttpsRedirection();

    app.UseAuthentication();

    app.UseAuthorization();

    app.MapControllers();

    app.Run();
  }
}