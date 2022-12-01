using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using server.Models;

namespace server.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; } = null!;
        public DbSet<Company> Companies { get; set; } = null!;
        public DbSet<Machine> Machines { get; set; } = null!;
        public DbSet<CompanyMachine> CompanyMachines { get; set; } = null!;
        public DbSet<Ticket> Tickets { get; set; } = null!;
        public DbSet<Notification> Notifications { get; set; } = null!;
        public DbSet<Solution> Solutions { get; set; } = null!;
        public DbSet<Token> Tokens { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<CompanyMachine>()
                .HasOne(cm => cm.Company)
                .WithMany(c => c.CompanyMachines)
                .HasForeignKey(cm => cm.CompanyId);
            modelBuilder.Entity<CompanyMachine>()
                .HasOne(cm => cm.Machine)
                .WithMany(m => m.CompanyMachines)
                .HasForeignKey(cm => cm.MachineId);

            modelBuilder.Entity<User>()
                .HasOne(u => u.Company)
                .WithMany(c => c.Users)
                .HasForeignKey(u => u.CompanyId);
            
            modelBuilder.Entity<Solution>()
                .HasOne(s => s.Machine)
                .WithMany(m => m.Solutions)
                .HasForeignKey(s => s.MachineId);
            
            modelBuilder.Entity<Notification>()
                .HasOne(n => n.User)
                .WithMany(u => u.Notifications)
                .HasForeignKey(n => n.UserId);
            
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Creator)
                .WithMany(c => c.CreatedTickets)
                .HasForeignKey(t => t.CreatorId);
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Assignee)
                .WithMany(a => a.AssignedTickets)
                .HasForeignKey(t => t.AssigneeId);
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.CompanyMachine)
                .WithMany(m => m.Tickets)
                .HasForeignKey(t => t.CompanyMachineId);
            modelBuilder.Entity<Ticket>()
                .HasOne(t => t.Company)
                .WithMany(c => c.Tickets)
                .HasForeignKey(t => t.CompanyId);

            modelBuilder.Entity<Token>()
                .HasKey(t => new { t.TokenValue, t.UserId });
            modelBuilder.Entity<Token>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tokens)
                .HasForeignKey(t => t.UserId);
        }
    }
}