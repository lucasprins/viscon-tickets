﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using server.Data;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "6.0.10")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("server.Models.Company", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Country")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Companies");

                    b.HasData(
                        new
                        {
                            Id = new Guid("9c0a6f40-dd54-4098-b879-4c31f54c887c"),
                            Country = "Netherlands (the)",
                            IsActive = true,
                            Name = "Viscon"
                        },
                        new
                        {
                            Id = new Guid("7623918f-6cca-4d31-b429-019868de2a0f"),
                            Country = "Netherlands (the)",
                            IsActive = true,
                            Name = "Customer"
                        });
                });

            modelBuilder.Entity("server.Models.CompanyMachine", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uuid");

                    b.Property<Guid>("MachineId")
                        .HasColumnType("uuid");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.HasIndex("MachineId");

                    b.ToTable("CompanyMachines");
                });

            modelBuilder.Entity("server.Models.Issue", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("MachineId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("MachineId");

                    b.ToTable("Issues");
                });

            modelBuilder.Entity("server.Models.Machine", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("BlueprintNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Machines");
                });

            modelBuilder.Entity("server.Models.Notification", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<bool>("IsRead")
                        .HasColumnType("boolean");

                    b.Property<string>("Message")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("Notifications");
                });

            modelBuilder.Entity("server.Models.Solution", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid>("IssueId")
                        .HasColumnType("uuid");

                    b.HasKey("Id");

                    b.HasIndex("IssueId");

                    b.ToTable("Solutions");
                });

            modelBuilder.Entity("server.Models.Ticket", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<string>("ActionExpected")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("ActionPerformed")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<Guid?>("AssigneeId")
                        .HasColumnType("uuid");

                    b.Property<string>("CancelReason")
                        .HasColumnType("text");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uuid");

                    b.Property<Guid?>("CompanyMachineId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("CreatorId")
                        .HasColumnType("uuid");

                    b.Property<string>("ExtraInfo")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Issue")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("IssueType")
                        .HasColumnType("integer");

                    b.Property<Guid?>("MachineId")
                        .HasColumnType("uuid");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Priority")
                        .HasColumnType("integer");

                    b.Property<string>("Solution")
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<int>("TicketNumber")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("AssigneeId");

                    b.HasIndex("CompanyId");

                    b.HasIndex("CompanyMachineId");

                    b.HasIndex("CreatorId");

                    b.HasIndex("MachineId");

                    b.ToTable("Tickets");
                });

            modelBuilder.Entity("server.Models.Token", b =>
                {
                    b.Property<Guid>("TokenValue")
                        .HasColumnType("uuid");

                    b.Property<Guid>("UserId")
                        .HasColumnType("uuid");

                    b.Property<DateTime>("CreationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateTime>("ExpirationDate")
                        .HasColumnType("timestamp with time zone");

                    b.Property<Guid>("Id")
                        .HasColumnType("uuid");

                    b.Property<int>("TokenType")
                        .HasColumnType("integer");

                    b.HasKey("TokenValue", "UserId");

                    b.HasIndex("UserId");

                    b.ToTable("Tokens");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Property<Guid>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("uuid");

                    b.Property<Guid>("CompanyId")
                        .HasColumnType("uuid");

                    b.Property<string>("Email")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("IsActive")
                        .HasColumnType("boolean");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("bytea");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("bytea");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<int>("Role")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("CompanyId");

                    b.ToTable("Users");

                    b.HasData(
                        new
                        {
                            Id = new Guid("51cfe35a-1ed1-4587-887e-6ef036b6b8e1"),
                            CompanyId = new Guid("9c0a6f40-dd54-4098-b879-4c31f54c887c"),
                            Email = "root@viscon.nl",
                            FirstName = "Viscon",
                            IsActive = true,
                            LastName = "Admin",
                            PasswordHash = new byte[] { 111, 226, 56, 233, 103, 200, 125, 64, 143, 64, 181, 3, 84, 253, 119, 143, 60, 3, 28, 221, 9, 53, 132, 182, 167, 52, 104, 189, 162, 17, 20, 149, 57, 248, 177, 243, 141, 164, 208, 112, 253, 74, 101, 125, 222, 178, 165, 185, 242, 139, 130, 157, 119, 67, 205, 9, 236, 0, 223, 83, 248, 29, 188, 98 },
                            PasswordSalt = new byte[] { 231, 161, 213, 45, 8, 246, 205, 71, 100, 219, 33, 241, 246, 123, 226, 162, 4, 176, 121, 131, 169, 93, 37, 232, 156, 122, 51, 239, 126, 22, 29, 194, 60, 8, 247, 141, 154, 237, 56, 41, 243, 106, 162, 45, 68, 18, 121, 177, 94, 69, 158, 170, 188, 202, 231, 163, 39, 159, 39, 12, 15, 141, 108, 225, 227, 119, 89, 30, 173, 107, 166, 158, 118, 0, 246, 106, 206, 78, 9, 31, 235, 135, 59, 86, 216, 48, 161, 242, 75, 2, 146, 77, 250, 5, 168, 64, 175, 235, 237, 92, 188, 189, 199, 78, 227, 218, 207, 223, 18, 15, 213, 17, 222, 102, 204, 160, 121, 135, 245, 96, 100, 55, 52, 3, 103, 17, 174, 147 },
                            Role = 2
                        },
                        new
                        {
                            Id = new Guid("265f7b8c-b81b-458c-8bb4-0afe8b42084e"),
                            CompanyId = new Guid("7623918f-6cca-4d31-b429-019868de2a0f"),
                            Email = "root@customer.nl",
                            FirstName = "Customer",
                            IsActive = true,
                            LastName = "Admin",
                            PasswordHash = new byte[] { 111, 226, 56, 233, 103, 200, 125, 64, 143, 64, 181, 3, 84, 253, 119, 143, 60, 3, 28, 221, 9, 53, 132, 182, 167, 52, 104, 189, 162, 17, 20, 149, 57, 248, 177, 243, 141, 164, 208, 112, 253, 74, 101, 125, 222, 178, 165, 185, 242, 139, 130, 157, 119, 67, 205, 9, 236, 0, 223, 83, 248, 29, 188, 98 },
                            PasswordSalt = new byte[] { 231, 161, 213, 45, 8, 246, 205, 71, 100, 219, 33, 241, 246, 123, 226, 162, 4, 176, 121, 131, 169, 93, 37, 232, 156, 122, 51, 239, 126, 22, 29, 194, 60, 8, 247, 141, 154, 237, 56, 41, 243, 106, 162, 45, 68, 18, 121, 177, 94, 69, 158, 170, 188, 202, 231, 163, 39, 159, 39, 12, 15, 141, 108, 225, 227, 119, 89, 30, 173, 107, 166, 158, 118, 0, 246, 106, 206, 78, 9, 31, 235, 135, 59, 86, 216, 48, 161, 242, 75, 2, 146, 77, 250, 5, 168, 64, 175, 235, 237, 92, 188, 189, 199, 78, 227, 218, 207, 223, 18, 15, 213, 17, 222, 102, 204, 160, 121, 135, 245, 96, 100, 55, 52, 3, 103, 17, 174, 147 },
                            Role = 4
                        });
                });

            modelBuilder.Entity("server.Models.CompanyMachine", b =>
                {
                    b.HasOne("server.Models.Company", "Company")
                        .WithMany("CompanyMachines")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Machine", "Machine")
                        .WithMany("CompanyMachines")
                        .HasForeignKey("MachineId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");

                    b.Navigation("Machine");
                });

            modelBuilder.Entity("server.Models.Issue", b =>
                {
                    b.HasOne("server.Models.Machine", "Machine")
                        .WithMany("Issues")
                        .HasForeignKey("MachineId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Machine");
                });

            modelBuilder.Entity("server.Models.Notification", b =>
                {
                    b.HasOne("server.Models.User", "User")
                        .WithMany("Notifications")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("server.Models.Solution", b =>
                {
                    b.HasOne("server.Models.Issue", "Issue")
                        .WithMany("Solutions")
                        .HasForeignKey("IssueId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Issue");
                });

            modelBuilder.Entity("server.Models.Ticket", b =>
                {
                    b.HasOne("server.Models.User", "Assignee")
                        .WithMany("AssignedTickets")
                        .HasForeignKey("AssigneeId");

                    b.HasOne("server.Models.Company", "Company")
                        .WithMany("Tickets")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.CompanyMachine", "CompanyMachine")
                        .WithMany("Tickets")
                        .HasForeignKey("CompanyMachineId");

                    b.HasOne("server.Models.User", "Creator")
                        .WithMany("CreatedTickets")
                        .HasForeignKey("CreatorId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("server.Models.Machine", null)
                        .WithMany("Tickets")
                        .HasForeignKey("MachineId");

                    b.Navigation("Assignee");

                    b.Navigation("Company");

                    b.Navigation("CompanyMachine");

                    b.Navigation("Creator");
                });

            modelBuilder.Entity("server.Models.Token", b =>
                {
                    b.HasOne("server.Models.User", "User")
                        .WithMany("Tokens")
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("User");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.HasOne("server.Models.Company", "Company")
                        .WithMany("Users")
                        .HasForeignKey("CompanyId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Company");
                });

            modelBuilder.Entity("server.Models.Company", b =>
                {
                    b.Navigation("CompanyMachines");

                    b.Navigation("Tickets");

                    b.Navigation("Users");
                });

            modelBuilder.Entity("server.Models.CompanyMachine", b =>
                {
                    b.Navigation("Tickets");
                });

            modelBuilder.Entity("server.Models.Issue", b =>
                {
                    b.Navigation("Solutions");
                });

            modelBuilder.Entity("server.Models.Machine", b =>
                {
                    b.Navigation("CompanyMachines");

                    b.Navigation("Issues");

                    b.Navigation("Tickets");
                });

            modelBuilder.Entity("server.Models.User", b =>
                {
                    b.Navigation("AssignedTickets");

                    b.Navigation("CreatedTickets");

                    b.Navigation("Notifications");

                    b.Navigation("Tokens");
                });
#pragma warning restore 612, 618
        }
    }
}
