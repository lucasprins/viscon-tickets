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
    [Migration("20221218115706_InitialCreate")]
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
                            Id = new Guid("c4c04b72-58df-459a-b20e-2d944bf30455"),
                            Country = "Netherlands (the)",
                            IsActive = true,
                            Name = "Viscon"
                        },
                        new
                        {
                            Id = new Guid("5bfdb64e-cc98-4965-99b1-0208875b30ed"),
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
                            Id = new Guid("b3e897c8-844d-4336-82bb-263e3caaee68"),
                            CompanyId = new Guid("c4c04b72-58df-459a-b20e-2d944bf30455"),
                            Email = "root@viscon.nl",
                            FirstName = "Viscon",
                            IsActive = true,
                            LastName = "Admin",
                            PasswordHash = new byte[] { 154, 215, 37, 181, 48, 158, 233, 12, 169, 100, 208, 156, 181, 204, 125, 249, 241, 71, 35, 185, 138, 35, 194, 0, 186, 121, 188, 6, 236, 17, 110, 153, 151, 187, 173, 39, 162, 251, 122, 38, 129, 19, 187, 48, 173, 163, 45, 250, 159, 184, 147, 137, 111, 65, 150, 67, 79, 58, 193, 194, 147, 74, 117, 143 },
                            PasswordSalt = new byte[] { 26, 247, 227, 11, 46, 242, 9, 230, 191, 174, 173, 164, 173, 102, 11, 29, 58, 91, 82, 236, 93, 151, 173, 38, 242, 159, 202, 28, 108, 93, 171, 54, 70, 207, 11, 8, 231, 180, 127, 211, 126, 238, 150, 208, 129, 101, 13, 53, 203, 47, 75, 40, 117, 189, 118, 165, 102, 214, 75, 204, 67, 238, 169, 164, 78, 77, 4, 206, 143, 171, 145, 43, 86, 195, 253, 38, 59, 227, 214, 84, 102, 255, 224, 128, 141, 106, 62, 142, 242, 180, 166, 208, 160, 192, 163, 72, 69, 128, 16, 47, 13, 146, 10, 188, 157, 27, 205, 166, 10, 157, 119, 174, 86, 11, 216, 126, 21, 86, 39, 93, 147, 47, 37, 91, 132, 20, 208, 203 },
                            Role = 2
                        },
                        new
                        {
                            Id = new Guid("1f9476eb-6b12-4ca0-bde9-8935e8dc54a7"),
                            CompanyId = new Guid("5bfdb64e-cc98-4965-99b1-0208875b30ed"),
                            Email = "root@customer.nl",
                            FirstName = "Customer",
                            IsActive = true,
                            LastName = "Admin",
                            PasswordHash = new byte[] { 154, 215, 37, 181, 48, 158, 233, 12, 169, 100, 208, 156, 181, 204, 125, 249, 241, 71, 35, 185, 138, 35, 194, 0, 186, 121, 188, 6, 236, 17, 110, 153, 151, 187, 173, 39, 162, 251, 122, 38, 129, 19, 187, 48, 173, 163, 45, 250, 159, 184, 147, 137, 111, 65, 150, 67, 79, 58, 193, 194, 147, 74, 117, 143 },
                            PasswordSalt = new byte[] { 26, 247, 227, 11, 46, 242, 9, 230, 191, 174, 173, 164, 173, 102, 11, 29, 58, 91, 82, 236, 93, 151, 173, 38, 242, 159, 202, 28, 108, 93, 171, 54, 70, 207, 11, 8, 231, 180, 127, 211, 126, 238, 150, 208, 129, 101, 13, 53, 203, 47, 75, 40, 117, 189, 118, 165, 102, 214, 75, 204, 67, 238, 169, 164, 78, 77, 4, 206, 143, 171, 145, 43, 86, 195, 253, 38, 59, 227, 214, 84, 102, 255, 224, 128, 141, 106, 62, 142, 242, 180, 166, 208, 160, 192, 163, 72, 69, 128, 16, 47, 13, 146, 10, 188, 157, 27, 205, 166, 10, 157, 119, 174, 86, 11, 216, 126, 21, 86, 39, 93, 147, 47, 37, 91, 132, 20, 208, 203 },
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
