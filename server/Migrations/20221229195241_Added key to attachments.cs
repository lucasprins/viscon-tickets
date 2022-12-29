using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace server.Migrations
{
    public partial class Addedkeytoattachments : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
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

            migrationBuilder.AddColumn<string>(
                name: "Key",
                table: "Attachments",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.InsertData(
                table: "Companies",
                columns: new[] { "Id", "Country", "IsActive", "Name" },
                values: new object[,]
                {
                    { new Guid("8b896eec-ee26-40f0-add7-691745f488e4"), "Netherlands (the)", true, "Customer" },
                    { new Guid("a3457195-1a5b-4897-b4eb-04662cfdd9ed"), "Netherlands (the)", true, "Viscon" }
                });

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "CompanyId", "Email", "FirstName", "IsActive", "LastName", "PasswordHash", "PasswordSalt", "PhoneNumber", "Role" },
                values: new object[,]
                {
                    { new Guid("1cb1e8d4-b4ce-4e76-bcb1-3fd26c8c9af9"), new Guid("a3457195-1a5b-4897-b4eb-04662cfdd9ed"), "root@viscon.nl", "Viscon", true, "Admin", new byte[] { 79, 79, 112, 67, 105, 87, 253, 68, 160, 2, 118, 215, 146, 73, 30, 11, 88, 71, 209, 154, 133, 252, 203, 143, 139, 152, 170, 41, 239, 205, 241, 62, 48, 74, 41, 121, 194, 39, 69, 32, 178, 233, 47, 198, 29, 64, 88, 255, 88, 101, 63, 232, 163, 143, 208, 103, 91, 18, 170, 181, 82, 100, 68, 206 }, new byte[] { 121, 36, 168, 255, 188, 240, 113, 145, 106, 87, 208, 231, 97, 64, 24, 15, 203, 228, 41, 145, 183, 241, 212, 14, 106, 198, 225, 230, 147, 192, 233, 35, 139, 241, 225, 155, 26, 79, 153, 167, 120, 87, 40, 187, 15, 125, 103, 81, 111, 86, 73, 254, 11, 85, 158, 128, 192, 204, 122, 9, 60, 254, 211, 43, 194, 43, 206, 55, 244, 133, 164, 201, 213, 27, 216, 167, 163, 20, 222, 153, 79, 244, 185, 44, 139, 129, 118, 148, 236, 190, 115, 48, 136, 147, 24, 80, 151, 50, 47, 178, 252, 218, 85, 94, 26, 140, 221, 113, 103, 172, 39, 72, 113, 151, 101, 71, 237, 12, 89, 93, 91, 120, 210, 155, 34, 131, 152, 19 }, null, 2 },
                    { new Guid("344266ee-f0b1-42eb-9d0d-0a298d23f388"), new Guid("8b896eec-ee26-40f0-add7-691745f488e4"), "root@customer.nl", "Customer", true, "Admin", new byte[] { 79, 79, 112, 67, 105, 87, 253, 68, 160, 2, 118, 215, 146, 73, 30, 11, 88, 71, 209, 154, 133, 252, 203, 143, 139, 152, 170, 41, 239, 205, 241, 62, 48, 74, 41, 121, 194, 39, 69, 32, 178, 233, 47, 198, 29, 64, 88, 255, 88, 101, 63, 232, 163, 143, 208, 103, 91, 18, 170, 181, 82, 100, 68, 206 }, new byte[] { 121, 36, 168, 255, 188, 240, 113, 145, 106, 87, 208, 231, 97, 64, 24, 15, 203, 228, 41, 145, 183, 241, 212, 14, 106, 198, 225, 230, 147, 192, 233, 35, 139, 241, 225, 155, 26, 79, 153, 167, 120, 87, 40, 187, 15, 125, 103, 81, 111, 86, 73, 254, 11, 85, 158, 128, 192, 204, 122, 9, 60, 254, 211, 43, 194, 43, 206, 55, 244, 133, 164, 201, 213, 27, 216, 167, 163, 20, 222, 153, 79, 244, 185, 44, 139, 129, 118, 148, 236, 190, 115, 48, 136, 147, 24, 80, 151, 50, 47, 178, 252, 218, 85, 94, 26, 140, 221, 113, 103, 172, 39, 72, 113, 151, 101, 71, 237, 12, 89, 93, 91, 120, 210, 155, 34, 131, 152, 19 }, null, 4 }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("1cb1e8d4-b4ce-4e76-bcb1-3fd26c8c9af9"));

            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("344266ee-f0b1-42eb-9d0d-0a298d23f388"));

            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "Id",
                keyValue: new Guid("8b896eec-ee26-40f0-add7-691745f488e4"));

            migrationBuilder.DeleteData(
                table: "Companies",
                keyColumn: "Id",
                keyValue: new Guid("a3457195-1a5b-4897-b4eb-04662cfdd9ed"));

            migrationBuilder.DropColumn(
                name: "Key",
                table: "Attachments");

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
        }
    }
}
