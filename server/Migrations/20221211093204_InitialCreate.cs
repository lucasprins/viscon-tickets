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
                    CompanyMachineId = table.Column<Guid>(type: "uuid", nullable: true),
                    CreatorId = table.Column<Guid>(type: "uuid", nullable: false),
                    AssigneeId = table.Column<Guid>(type: "uuid", nullable: true),
                    CompanyId = table.Column<Guid>(type: "uuid", nullable: false)
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
                    { new Guid("010a51f9-7ffc-4846-ad27-5a267a971d41"), "Netherlands (the)", true, "Customer" },
                    { new Guid("c58b2db0-1d84-4180-99e7-da64422e0a42"), "Netherlands (the)", true, "Viscon" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CompanyId", "Email", "FirstName", "IsActive", "LastName", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role" },
                values: new object[,]
                {
                    { new Guid("23bd719b-4c71-40c3-8f63-1d414d76b27a"), new Guid("c58b2db0-1d84-4180-99e7-da64422e0a42"), "root@viscon.nl", "Viscon", true, "Admin", new byte[] { 218, 123, 35, 22, 78, 109, 144, 167, 82, 122, 253, 217, 49, 35, 169, 206, 36, 126, 111, 3, 6, 239, 118, 1, 211, 183, 154, 194, 247, 230, 168, 56, 2, 198, 135, 35, 130, 203, 154, 149, 132, 58, 151, 189, 20, 98, 254, 90, 59, 135, 194, 126, 135, 131, 99, 107, 20, 224, 158, 163, 145, 56, 175, 228 }, new byte[] { 65, 12, 168, 23, 16, 56, 17, 110, 200, 71, 9, 248, 171, 10, 24, 123, 229, 151, 69, 237, 241, 201, 234, 28, 88, 199, 89, 91, 162, 68, 35, 142, 30, 184, 63, 109, 53, 101, 48, 61, 191, 77, 112, 239, 229, 252, 233, 24, 8, 41, 17, 174, 246, 30, 102, 114, 247, 108, 216, 242, 184, 205, 163, 132, 228, 49, 168, 228, 112, 201, 155, 41, 184, 161, 80, 97, 100, 45, 133, 180, 171, 236, 158, 22, 2, 23, 241, 157, 103, 211, 31, 143, 115, 31, 15, 4, 58, 234, 249, 46, 8, 247, 33, 222, 248, 222, 41, 170, 42, 118, 8, 253, 76, 106, 224, 73, 125, 154, 50, 165, 93, 72, 107, 241, 126, 13, 200, 76 }, null, 2 },
                    { new Guid("c250188a-5752-40c2-b8c3-e6e2bc903525"), new Guid("010a51f9-7ffc-4846-ad27-5a267a971d41"), "root@customer.nl", "Customer", true, "Admin", new byte[] { 218, 123, 35, 22, 78, 109, 144, 167, 82, 122, 253, 217, 49, 35, 169, 206, 36, 126, 111, 3, 6, 239, 118, 1, 211, 183, 154, 194, 247, 230, 168, 56, 2, 198, 135, 35, 130, 203, 154, 149, 132, 58, 151, 189, 20, 98, 254, 90, 59, 135, 194, 126, 135, 131, 99, 107, 20, 224, 158, 163, 145, 56, 175, 228 }, new byte[] { 65, 12, 168, 23, 16, 56, 17, 110, 200, 71, 9, 248, 171, 10, 24, 123, 229, 151, 69, 237, 241, 201, 234, 28, 88, 199, 89, 91, 162, 68, 35, 142, 30, 184, 63, 109, 53, 101, 48, 61, 191, 77, 112, 239, 229, 252, 233, 24, 8, 41, 17, 174, 246, 30, 102, 114, 247, 108, 216, 242, 184, 205, 163, 132, 228, 49, 168, 228, 112, 201, 155, 41, 184, 161, 80, 97, 100, 45, 133, 180, 171, 236, 158, 22, 2, 23, 241, 157, 103, 211, 31, 143, 115, 31, 15, 4, 58, 234, 249, 46, 8, 247, 33, 222, 248, 222, 41, 170, 42, 118, 8, 253, 76, 106, 224, 73, 125, 154, 50, 165, 93, 72, 107, 241, 126, 13, 200, 76 }, null, 4 }
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
