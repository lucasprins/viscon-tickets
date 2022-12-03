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
                    { new Guid("7a5e982e-ba0e-4ab8-85e0-eee68b3ecf30"), "Netherlands (the)", true, "Customer" },
                    { new Guid("f3982ab5-7cae-4ed1-bb89-14247e7b7120"), "Netherlands (the)", true, "Viscon" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CompanyId", "Email", "FirstName", "IsActive", "LastName", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role" },
                values: new object[,]
                {
                    { new Guid("73a87d4f-ea58-4c6b-859e-6e5c6977a9af"), new Guid("7a5e982e-ba0e-4ab8-85e0-eee68b3ecf30"), "root@customer.nl", "Customer", true, "Admin", new byte[] { 248, 102, 48, 126, 178, 180, 228, 62, 223, 20, 74, 215, 202, 215, 161, 175, 16, 27, 147, 152, 90, 68, 71, 212, 45, 9, 60, 110, 135, 123, 165, 231, 130, 77, 117, 77, 168, 78, 152, 105, 26, 188, 164, 52, 39, 55, 55, 142, 147, 183, 63, 157, 71, 44, 179, 165, 67, 65, 249, 2, 103, 63, 9, 222 }, new byte[] { 47, 9, 236, 243, 183, 209, 59, 113, 6, 174, 43, 11, 76, 103, 159, 176, 136, 32, 35, 146, 123, 167, 242, 29, 55, 169, 246, 91, 52, 137, 145, 207, 75, 216, 99, 170, 13, 119, 75, 228, 206, 186, 219, 187, 132, 171, 154, 61, 93, 140, 200, 28, 17, 165, 233, 147, 174, 150, 118, 55, 88, 48, 3, 165, 165, 109, 89, 171, 64, 145, 184, 222, 75, 209, 141, 54, 140, 88, 241, 32, 215, 53, 237, 35, 254, 129, 24, 212, 213, 193, 177, 202, 226, 186, 78, 106, 155, 18, 224, 142, 118, 30, 155, 83, 250, 138, 227, 88, 121, 153, 171, 8, 18, 251, 45, 228, 148, 226, 203, 76, 212, 231, 211, 172, 17, 97, 0, 56 }, null, 4 },
                    { new Guid("d61dd356-caa2-4998-9096-605d05299e76"), new Guid("f3982ab5-7cae-4ed1-bb89-14247e7b7120"), "root@viscon.nl", "Viscon", true, "Admin", new byte[] { 248, 102, 48, 126, 178, 180, 228, 62, 223, 20, 74, 215, 202, 215, 161, 175, 16, 27, 147, 152, 90, 68, 71, 212, 45, 9, 60, 110, 135, 123, 165, 231, 130, 77, 117, 77, 168, 78, 152, 105, 26, 188, 164, 52, 39, 55, 55, 142, 147, 183, 63, 157, 71, 44, 179, 165, 67, 65, 249, 2, 103, 63, 9, 222 }, new byte[] { 47, 9, 236, 243, 183, 209, 59, 113, 6, 174, 43, 11, 76, 103, 159, 176, 136, 32, 35, 146, 123, 167, 242, 29, 55, 169, 246, 91, 52, 137, 145, 207, 75, 216, 99, 170, 13, 119, 75, 228, 206, 186, 219, 187, 132, 171, 154, 61, 93, 140, 200, 28, 17, 165, 233, 147, 174, 150, 118, 55, 88, 48, 3, 165, 165, 109, 89, 171, 64, 145, 184, 222, 75, 209, 141, 54, 140, 88, 241, 32, 215, 53, 237, 35, 254, 129, 24, 212, 213, 193, 177, 202, 226, 186, 78, 106, 155, 18, 224, 142, 118, 30, 155, 83, 250, 138, 227, 88, 121, 153, 171, 8, 18, 251, 45, 228, 148, 226, 203, 76, 212, 231, 211, 172, 17, 97, 0, 56 }, null, 2 }
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
