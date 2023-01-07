using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class Addedattachments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("1f9476eb-6b12-4ca0-bde9-8935e8dc54a7"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("b3e897c8-844d-4336-82bb-263e3caaee68"));

            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "Id",
                keyValue: new Guid("5bfdb64e-cc98-4965-99b1-0208875b30ed"));

            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "Id",
                keyValue: new Guid("c4c04b72-58df-459a-b20e-2d944bf30455"));

            migrationBuilder.CreateTable(
                name: "Attachments",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uuid", nullable: false),
                    TicketId = table.Column<Guid>(type: "uuid", nullable: false),
                    URL = table.Column<string>(type: "text", nullable: false),
                    Type = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Attachments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Attachments_Tickets_TicketId",
                        column: x => x.TicketId,
                        principalTable: "Tickets",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "Country", "IsActive", "Name" },
                values: new object[,]
                {
                    { new Guid("5fc9db75-03f3-48c8-b915-e3f21678a3f5"), "Netherlands (the)", true, "Customer" },
                    { new Guid("75ecb297-556f-4083-8b2d-28feafbaaeee"), "Netherlands (the)", true, "Viscon" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CompanyId", "Email", "FirstName", "IsActive", "LastName", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role" },
                values: new object[,]
                {
                    { new Guid("5336abe9-c3ea-46e3-b4c6-db1721d07696"), new Guid("75ecb297-556f-4083-8b2d-28feafbaaeee"), "root@viscon.nl", "Viscon", true, "Admin", new byte[] { 201, 23, 141, 3, 168, 207, 217, 77, 37, 186, 157, 37, 139, 237, 192, 84, 72, 240, 142, 116, 247, 245, 5, 54, 205, 197, 153, 237, 233, 242, 90, 251, 83, 106, 125, 29, 161, 224, 52, 88, 231, 12, 31, 19, 36, 77, 25, 188, 153, 76, 3, 81, 107, 3, 245, 21, 126, 126, 9, 140, 11, 99, 91, 77 }, new byte[] { 230, 81, 208, 34, 108, 133, 119, 210, 175, 38, 15, 194, 118, 82, 59, 208, 72, 11, 141, 187, 9, 4, 8, 157, 140, 48, 125, 150, 40, 84, 55, 39, 116, 3, 53, 199, 190, 152, 236, 87, 21, 93, 141, 153, 253, 146, 214, 197, 28, 35, 235, 153, 237, 75, 20, 96, 117, 232, 225, 156, 207, 162, 152, 80, 75, 0, 240, 235, 85, 92, 198, 29, 179, 21, 234, 94, 230, 202, 75, 229, 210, 57, 160, 130, 160, 185, 62, 30, 241, 48, 141, 163, 161, 79, 173, 122, 227, 154, 214, 235, 55, 131, 87, 99, 94, 138, 108, 105, 241, 229, 195, 240, 153, 170, 125, 18, 205, 134, 171, 247, 187, 117, 89, 182, 201, 58, 100, 75 }, null, 2 },
                    { new Guid("f9d6fd5f-e3f6-4d76-9752-a42275c69641"), new Guid("5fc9db75-03f3-48c8-b915-e3f21678a3f5"), "root@customer.nl", "Customer", true, "Admin", new byte[] { 201, 23, 141, 3, 168, 207, 217, 77, 37, 186, 157, 37, 139, 237, 192, 84, 72, 240, 142, 116, 247, 245, 5, 54, 205, 197, 153, 237, 233, 242, 90, 251, 83, 106, 125, 29, 161, 224, 52, 88, 231, 12, 31, 19, 36, 77, 25, 188, 153, 76, 3, 81, 107, 3, 245, 21, 126, 126, 9, 140, 11, 99, 91, 77 }, new byte[] { 230, 81, 208, 34, 108, 133, 119, 210, 175, 38, 15, 194, 118, 82, 59, 208, 72, 11, 141, 187, 9, 4, 8, 157, 140, 48, 125, 150, 40, 84, 55, 39, 116, 3, 53, 199, 190, 152, 236, 87, 21, 93, 141, 153, 253, 146, 214, 197, 28, 35, 235, 153, 237, 75, 20, 96, 117, 232, 225, 156, 207, 162, 152, 80, 75, 0, 240, 235, 85, 92, 198, 29, 179, 21, 234, 94, 230, 202, 75, 229, 210, 57, 160, 130, 160, 185, 62, 30, 241, 48, 141, 163, 161, 79, 173, 122, 227, 154, 214, 235, 55, 131, 87, 99, 94, 138, 108, 105, 241, 229, 195, 240, 153, 170, 125, 18, 205, 134, 171, 247, 187, 117, 89, 182, 201, 58, 100, 75 }, null, 4 }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Attachments_TicketId",
                table: "Attachments",
                column: "TicketId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Attachments");

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("5336abe9-c3ea-46e3-b4c6-db1721d07696"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("f9d6fd5f-e3f6-4d76-9752-a42275c69641"));

            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "Id",
                keyValue: new Guid("5fc9db75-03f3-48c8-b915-e3f21678a3f5"));

            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "Id",
                keyValue: new Guid("75ecb297-556f-4083-8b2d-28feafbaaeee"));

            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "Country", "IsActive", "Name" },
                values: new object[,]
                {
                    { new Guid("5bfdb64e-cc98-4965-99b1-0208875b30ed"), "Netherlands (the)", true, "Customer" },
                    { new Guid("c4c04b72-58df-459a-b20e-2d944bf30455"), "Netherlands (the)", true, "Viscon" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CompanyId", "Email", "FirstName", "IsActive", "LastName", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role" },
                values: new object[,]
                {
                    { new Guid("1f9476eb-6b12-4ca0-bde9-8935e8dc54a7"), new Guid("5bfdb64e-cc98-4965-99b1-0208875b30ed"), "root@customer.nl", "Customer", true, "Admin", new byte[] { 154, 215, 37, 181, 48, 158, 233, 12, 169, 100, 208, 156, 181, 204, 125, 249, 241, 71, 35, 185, 138, 35, 194, 0, 186, 121, 188, 6, 236, 17, 110, 153, 151, 187, 173, 39, 162, 251, 122, 38, 129, 19, 187, 48, 173, 163, 45, 250, 159, 184, 147, 137, 111, 65, 150, 67, 79, 58, 193, 194, 147, 74, 117, 143 }, new byte[] { 26, 247, 227, 11, 46, 242, 9, 230, 191, 174, 173, 164, 173, 102, 11, 29, 58, 91, 82, 236, 93, 151, 173, 38, 242, 159, 202, 28, 108, 93, 171, 54, 70, 207, 11, 8, 231, 180, 127, 211, 126, 238, 150, 208, 129, 101, 13, 53, 203, 47, 75, 40, 117, 189, 118, 165, 102, 214, 75, 204, 67, 238, 169, 164, 78, 77, 4, 206, 143, 171, 145, 43, 86, 195, 253, 38, 59, 227, 214, 84, 102, 255, 224, 128, 141, 106, 62, 142, 242, 180, 166, 208, 160, 192, 163, 72, 69, 128, 16, 47, 13, 146, 10, 188, 157, 27, 205, 166, 10, 157, 119, 174, 86, 11, 216, 126, 21, 86, 39, 93, 147, 47, 37, 91, 132, 20, 208, 203 }, null, 4 },
                    { new Guid("b3e897c8-844d-4336-82bb-263e3caaee68"), new Guid("c4c04b72-58df-459a-b20e-2d944bf30455"), "root@viscon.nl", "Viscon", true, "Admin", new byte[] { 154, 215, 37, 181, 48, 158, 233, 12, 169, 100, 208, 156, 181, 204, 125, 249, 241, 71, 35, 185, 138, 35, 194, 0, 186, 121, 188, 6, 236, 17, 110, 153, 151, 187, 173, 39, 162, 251, 122, 38, 129, 19, 187, 48, 173, 163, 45, 250, 159, 184, 147, 137, 111, 65, 150, 67, 79, 58, 193, 194, 147, 74, 117, 143 }, new byte[] { 26, 247, 227, 11, 46, 242, 9, 230, 191, 174, 173, 164, 173, 102, 11, 29, 58, 91, 82, 236, 93, 151, 173, 38, 242, 159, 202, 28, 108, 93, 171, 54, 70, 207, 11, 8, 231, 180, 127, 211, 126, 238, 150, 208, 129, 101, 13, 53, 203, 47, 75, 40, 117, 189, 118, 165, 102, 214, 75, 204, 67, 238, 169, 164, 78, 77, 4, 206, 143, 171, 145, 43, 86, 195, 253, 38, 59, 227, 214, 84, 102, 255, 224, 128, 141, 106, 62, 142, 242, 180, 166, 208, 160, 192, 163, 72, 69, 128, 16, 47, 13, 146, 10, 188, 157, 27, 205, 166, 10, 157, 119, 174, 86, 11, 216, 126, 21, 86, 39, 93, 147, 47, 37, 91, 132, 20, 208, 203 }, null, 2 }
                });
        }
    }
}
