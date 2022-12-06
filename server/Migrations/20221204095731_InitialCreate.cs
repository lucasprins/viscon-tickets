using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Companies",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    Country = table.Column<string>(type: "text", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Companies", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Machines",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    BlueprintNumber = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Machines", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    FirstName = table.Column<string>(type: "text", nullable: false),
                    LastName = table.Column<string>(type: "text", nullable: false),
                    Email = table.Column<string>(type: "text", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "bytea", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "bytea", nullable: true),
                    Role = table.Column<int>(type: "integer", nullable: false),
                    IsActive = table.Column<bool>(type: "boolean", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Users_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CompanyMachines",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Name = table.Column<string>(type: "text", nullable: false),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    MachineId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CompanyMachines", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CompanyMachines_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_CompanyMachines_Machines_MachineId",
                        column: x => x.MachineId,
                        principalTable: "Machines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Solutions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Issue = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    Language = table.Column<string>(type: "text", nullable: false),
                    MachineId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Solutions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Solutions_Machines_MachineId",
                        column: x => x.MachineId,
                        principalTable: "Machines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Notifications",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Message = table.Column<string>(type: "text", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    IsRead = table.Column<bool>(type: "boolean", nullable: false),
                    UserId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Notifications", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Notifications_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tokens",
                columns: table => new
                {
                    UserId = table.Column<Guid>(type: "uuid", nullable: false),
                    TokenValue = table.Column<Guid>(type: "uuid", nullable: false),
                    TokenType = table.Column<int>(type: "integer", nullable: false),
                    ExpirationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tokens", x => new { x.TokenValue, x.UserId });
                    table.ForeignKey(
                        name: "FK_Tokens_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Tickets",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TicketNumber = table.Column<int>(type: "integer", nullable: false),
                    PhoneNumber = table.Column<string>(type: "text", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Status = table.Column<int>(type: "integer", nullable: false),
                    Priority = table.Column<int>(type: "integer", nullable: false),
                    IssueType = table.Column<int>(type: "integer", nullable: false),
                    Issue = table.Column<string>(type: "text", nullable: false),
                    ActionExpected = table.Column<string>(type: "text", nullable: false),
                    ActionPerformed = table.Column<string>(type: "text", nullable: false),
                    ExtraInfo = table.Column<string>(type: "text", nullable: false),
                    Solution = table.Column<string>(type: "text", nullable: true),
                    CancelReason = table.Column<string>(type: "text", nullable: true),
                    CompanyMachineId = table.Column<Guid>(type: "uuid", nullable: false),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: false),
                    AssigneeId = table.Column<Guid>(type: "uuid", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false),
                    MachineId = table.Column<Guid>(type: "uuid", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tickets", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Tickets_Companies_CompanyId",
                        column: x => x.CompanyId,
                        principalTable: "Companies",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_CompanyMachines_CompanyMachineId",
                        column: x => x.CompanyMachineId,
                        principalTable: "CompanyMachines",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Tickets_Machines_MachineId",
                        column: x => x.MachineId,
                        principalTable: "Machines",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tickets_Users_AssigneeId",
                        column: x => x.AssigneeId,
                        principalTable: "Users",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_Tickets_Users_CreatorId",
                        column: x => x.CreatorId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "Country", "IsActive", "Name" },
                values: new object[,]
                {
                    { new Guid("1f7853c5-4bb7-448d-886e-3a573806a502"), "Netherlands (the)", true, "Viscon" },
                    { new Guid("2f859672-5768-4413-9f0b-727023bda1b3"), "Netherlands (the)", true, "Customer" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CompanyId", "Email", "FirstName", "IsActive", "LastName", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role" },
                values: new object[,]
                {
                    { new Guid("0a525c40-6248-4c6f-9743-809300df3e8c"), new Guid("2f859672-5768-4413-9f0b-727023bda1b3"), "root@customer.nl", "Customer", true, "Admin", new byte[] { 60, 130, 195, 27, 89, 48, 51, 151, 144, 32, 99, 189, 198, 183, 105, 223, 40, 254, 198, 249, 77, 65, 173, 220, 146, 244, 117, 233, 141, 50, 151, 201, 121, 142, 38, 172, 225, 149, 231, 108, 91, 222, 12, 125, 186, 5, 56, 209, 172, 165, 26, 114, 15, 238, 170, 231, 141, 11, 194, 159, 79, 188, 84, 184 }, new byte[] { 113, 63, 39, 166, 107, 240, 63, 249, 97, 60, 184, 197, 26, 177, 123, 5, 223, 15, 167, 206, 90, 29, 183, 68, 20, 249, 156, 29, 75, 71, 243, 55, 49, 197, 230, 101, 123, 140, 132, 51, 161, 11, 230, 63, 151, 8, 47, 154, 238, 177, 13, 23, 21, 34, 83, 164, 165, 1, 96, 255, 53, 96, 232, 163, 49, 213, 236, 149, 36, 65, 160, 24, 29, 128, 118, 165, 7, 11, 141, 164, 114, 250, 178, 125, 147, 135, 145, 217, 94, 95, 141, 74, 145, 185, 138, 22, 102, 4, 119, 54, 54, 161, 27, 149, 226, 78, 12, 153, 222, 209, 6, 43, 213, 203, 53, 170, 73, 128, 41, 15, 200, 133, 148, 111, 160, 255, 149, 51 }, null, 4 },
                    { new Guid("3286e0f3-db49-4fca-b133-42df2ef453fe"), new Guid("1f7853c5-4bb7-448d-886e-3a573806a502"), "root@viscon.nl", "Viscon", true, "Admin", new byte[] { 60, 130, 195, 27, 89, 48, 51, 151, 144, 32, 99, 189, 198, 183, 105, 223, 40, 254, 198, 249, 77, 65, 173, 220, 146, 244, 117, 233, 141, 50, 151, 201, 121, 142, 38, 172, 225, 149, 231, 108, 91, 222, 12, 125, 186, 5, 56, 209, 172, 165, 26, 114, 15, 238, 170, 231, 141, 11, 194, 159, 79, 188, 84, 184 }, new byte[] { 113, 63, 39, 166, 107, 240, 63, 249, 97, 60, 184, 197, 26, 177, 123, 5, 223, 15, 167, 206, 90, 29, 183, 68, 20, 249, 156, 29, 75, 71, 243, 55, 49, 197, 230, 101, 123, 140, 132, 51, 161, 11, 230, 63, 151, 8, 47, 154, 238, 177, 13, 23, 21, 34, 83, 164, 165, 1, 96, 255, 53, 96, 232, 163, 49, 213, 236, 149, 36, 65, 160, 24, 29, 128, 118, 165, 7, 11, 141, 164, 114, 250, 178, 125, 147, 135, 145, 217, 94, 95, 141, 74, 145, 185, 138, 22, 102, 4, 119, 54, 54, 161, 27, 149, 226, 78, 12, 153, 222, 209, 6, 43, 213, 203, 53, 170, 73, 128, 41, 15, 200, 133, 148, 111, 160, 255, 149, 51 }, null, 2 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_CompanyMachines_CompanyId",
                table: "CompanyMachines",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_CompanyMachines_MachineId",
                table: "CompanyMachines",
                column: "MachineId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Solutions_MachineId",
                table: "Solutions",
                column: "MachineId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_AssigneeId",
                table: "Tickets",
                column: "AssigneeId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_CompanyId",
                table: "Tickets",
                column: "CompanyId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_CompanyMachineId",
                table: "Tickets",
                column: "CompanyMachineId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_CreatorId",
                table: "Tickets",
                column: "CreatorId");

            migrationBuilder.CreateIndex(
                name: "IX_Tickets_MachineId",
                table: "Tickets",
                column: "MachineId");

            migrationBuilder.CreateIndex(
                name: "IX_Tokens_UserId",
                table: "Tokens",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Users_CompanyId",
                table: "Users",
                column: "CompanyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Notifications");

            migrationBuilder.DropTable(
                name: "Solutions");

            migrationBuilder.DropTable(
                name: "Tickets");

            migrationBuilder.DropTable(
                name: "Tokens");

            migrationBuilder.DropTable(
                name: "CompanyMachines");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "Machines");

            migrationBuilder.DropTable(
                name: "Companies");
        }
    }
}
