﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using server.Data;

#nullable disable

namespace server.Migrations
{
    [DbContext(typeof(DataContext))]
    [Migration("20221207185651_InitialCreate")]
    partial class InitialCreate
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
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
                            Id = new Guid("b5edb80e-9ee4-4920-bcba-3d30d400e9f4"),
                            Country = "Netherlands (the)",
                            IsActive = true,
                            Name = "Viscon"
                        },
                        new
                        {
                            Id = new Guid("f2ecee3c-6eae-4f5f-b8e2-3a357714d38f"),
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

                    b.Property<Guid>("CompanyMachineId")
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

                    b.Property<DateTime>("ExpirationDate")
                        .HasColumnType("timestamp with time zone");

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
                            Id = new Guid("60c82659-9b1b-42a4-b2db-4ea512e8a60e"),
                            CompanyId = new Guid("b5edb80e-9ee4-4920-bcba-3d30d400e9f4"),
                            Email = "root@viscon.nl",
                            FirstName = "Viscon",
                            IsActive = true,
                            LastName = "Admin",
                            PasswordHash = new byte[] { 138, 95, 118, 41, 231, 104, 231, 133, 39, 19, 254, 83, 2, 246, 184, 197, 79, 168, 32, 101, 14, 82, 213, 139, 62, 167, 212, 147, 155, 161, 174, 168, 51, 218, 127, 114, 108, 42, 67, 12, 88, 108, 0, 116, 83, 61, 205, 47, 130, 183, 115, 155, 141, 113, 171, 224, 170, 113, 206, 153, 112, 252, 17, 11 },
                            PasswordSalt = new byte[] { 81, 22, 80, 84, 42, 229, 148, 96, 41, 211, 63, 167, 193, 30, 222, 178, 57, 174, 219, 72, 60, 55, 204, 231, 45, 107, 179, 1, 160, 47, 192, 212, 78, 116, 198, 102, 98, 61, 176, 246, 115, 137, 181, 22, 93, 1, 190, 178, 49, 231, 78, 108, 56, 228, 246, 219, 11, 40, 241, 110, 203, 22, 83, 85, 3, 132, 84, 39, 58, 206, 188, 166, 51, 197, 157, 63, 210, 128, 62, 81, 203, 208, 222, 12, 215, 35, 89, 64, 58, 48, 149, 93, 150, 88, 245, 31, 105, 133, 245, 4, 202, 228, 59, 97, 28, 201, 234, 255, 156, 61, 233, 29, 64, 227, 17, 77, 152, 165, 203, 167, 53, 41, 85, 36, 97, 17, 115, 68 },
                            Role = 2
                        },
                        new
                        {
                            Id = new Guid("dc204b93-59bf-4171-bd49-e72798fc36e8"),
                            CompanyId = new Guid("f2ecee3c-6eae-4f5f-b8e2-3a357714d38f"),
                            Email = "root@customer.nl",
                            FirstName = "Customer",
                            IsActive = true,
                            LastName = "Admin",
                            PasswordHash = new byte[] { 138, 95, 118, 41, 231, 104, 231, 133, 39, 19, 254, 83, 2, 246, 184, 197, 79, 168, 32, 101, 14, 82, 213, 139, 62, 167, 212, 147, 155, 161, 174, 168, 51, 218, 127, 114, 108, 42, 67, 12, 88, 108, 0, 116, 83, 61, 205, 47, 130, 183, 115, 155, 141, 113, 171, 224, 170, 113, 206, 153, 112, 252, 17, 11 },
                            PasswordSalt = new byte[] { 81, 22, 80, 84, 42, 229, 148, 96, 41, 211, 63, 167, 193, 30, 222, 178, 57, 174, 219, 72, 60, 55, 204, 231, 45, 107, 179, 1, 160, 47, 192, 212, 78, 116, 198, 102, 98, 61, 176, 246, 115, 137, 181, 22, 93, 1, 190, 178, 49, 231, 78, 108, 56, 228, 246, 219, 11, 40, 241, 110, 203, 22, 83, 85, 3, 132, 84, 39, 58, 206, 188, 166, 51, 197, 157, 63, 210, 128, 62, 81, 203, 208, 222, 12, 215, 35, 89, 64, 58, 48, 149, 93, 150, 88, 245, 31, 105, 133, 245, 4, 202, 228, 59, 97, 28, 201, 234, 255, 156, 61, 233, 29, 64, 227, 17, 77, 152, 165, 203, 167, 53, 41, 85, 36, 97, 17, 115, 68 },
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
                        .HasForeignKey("CompanyMachineId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

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