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

        public DbSet<Company> Companies { get; set; } = null!;
        public DbSet<Machine> Machines { get; set; } = null!;
        public DbSet<CompanyMachine> CompanyMachines { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<CompanyMachine>()
                .HasKey(cm => new { cm.CompanyId, cm.MachineId });
            modelBuilder.Entity<CompanyMachine>()
                .HasOne(cm => cm.Company)
                .WithMany(c => c.CompanyMachines)
                .HasForeignKey(cm => cm.CompanyId);
            modelBuilder.Entity<CompanyMachine>()
                .HasOne(cm => cm.Machine)
                .WithMany(m => m.CompanyMachines)
                .HasForeignKey(cm => cm.MachineId);
        }
    }
}