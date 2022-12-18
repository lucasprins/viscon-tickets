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
                name: "Issues",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    MachineId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Issues", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Issues_Machines_MachineId",
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
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TokenType = table.Column<int>(type: "integer", nullable: false),
                    CreationDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
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
                    CompanyMachineId = table.Column<Guid>(type: "uuid", nullable: true),
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
                        principalColumn: "Id");
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

            migrationBuilder.CreateTable(
                name: "Solutions",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: false),
                    IssueId = table.Column<Guid>(type: "uuid", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Solutions", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Solutions_Issues_IssueId",
                        column: x => x.IssueId,
                        principalTable: "Issues",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "Country", "IsActive", "Name" },
                values: new object[,]
                {
                    { new Guid("7623918f-6cca-4d31-b429-019868de2a0f"), "Netherlands (the)", true, "Customer" },
                    { new Guid("9c0a6f40-dd54-4098-b879-4c31f54c887c"), "Netherlands (the)", true, "Viscon" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CompanyId", "Email", "FirstName", "IsActive", "LastName", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role" },
                values: new object[,]
                {
                    { new Guid("265f7b8c-b81b-458c-8bb4-0afe8b42084e"), new Guid("7623918f-6cca-4d31-b429-019868de2a0f"), "root@customer.nl", "Customer", true, "Admin", new byte[] { 111, 226, 56, 233, 103, 200, 125, 64, 143, 64, 181, 3, 84, 253, 119, 143, 60, 3, 28, 221, 9, 53, 132, 182, 167, 52, 104, 189, 162, 17, 20, 149, 57, 248, 177, 243, 141, 164, 208, 112, 253, 74, 101, 125, 222, 178, 165, 185, 242, 139, 130, 157, 119, 67, 205, 9, 236, 0, 223, 83, 248, 29, 188, 98 }, new byte[] { 231, 161, 213, 45, 8, 246, 205, 71, 100, 219, 33, 241, 246, 123, 226, 162, 4, 176, 121, 131, 169, 93, 37, 232, 156, 122, 51, 239, 126, 22, 29, 194, 60, 8, 247, 141, 154, 237, 56, 41, 243, 106, 162, 45, 68, 18, 121, 177, 94, 69, 158, 170, 188, 202, 231, 163, 39, 159, 39, 12, 15, 141, 108, 225, 227, 119, 89, 30, 173, 107, 166, 158, 118, 0, 246, 106, 206, 78, 9, 31, 235, 135, 59, 86, 216, 48, 161, 242, 75, 2, 146, 77, 250, 5, 168, 64, 175, 235, 237, 92, 188, 189, 199, 78, 227, 218, 207, 223, 18, 15, 213, 17, 222, 102, 204, 160, 121, 135, 245, 96, 100, 55, 52, 3, 103, 17, 174, 147 }, null, 4 },
                    { new Guid("51cfe35a-1ed1-4587-887e-6ef036b6b8e1"), new Guid("9c0a6f40-dd54-4098-b879-4c31f54c887c"), "root@viscon.nl", "Viscon", true, "Admin", new byte[] { 111, 226, 56, 233, 103, 200, 125, 64, 143, 64, 181, 3, 84, 253, 119, 143, 60, 3, 28, 221, 9, 53, 132, 182, 167, 52, 104, 189, 162, 17, 20, 149, 57, 248, 177, 243, 141, 164, 208, 112, 253, 74, 101, 125, 222, 178, 165, 185, 242, 139, 130, 157, 119, 67, 205, 9, 236, 0, 223, 83, 248, 29, 188, 98 }, new byte[] { 231, 161, 213, 45, 8, 246, 205, 71, 100, 219, 33, 241, 246, 123, 226, 162, 4, 176, 121, 131, 169, 93, 37, 232, 156, 122, 51, 239, 126, 22, 29, 194, 60, 8, 247, 141, 154, 237, 56, 41, 243, 106, 162, 45, 68, 18, 121, 177, 94, 69, 158, 170, 188, 202, 231, 163, 39, 159, 39, 12, 15, 141, 108, 225, 227, 119, 89, 30, 173, 107, 166, 158, 118, 0, 246, 106, 206, 78, 9, 31, 235, 135, 59, 86, 216, 48, 161, 242, 75, 2, 146, 77, 250, 5, 168, 64, 175, 235, 237, 92, 188, 189, 199, 78, 227, 218, 207, 223, 18, 15, 213, 17, 222, 102, 204, 160, 121, 135, 245, 96, 100, 55, 52, 3, 103, 17, 174, 147 }, null, 2 }
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
                name: "IX_Issues_MachineId",
                table: "Issues",
                column: "MachineId");

            migrationBuilder.CreateIndex(
                name: "IX_Notifications_UserId",
                table: "Notifications",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_Solutions_IssueId",
                table: "Solutions",
                column: "IssueId");

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
                name: "Issues");

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
