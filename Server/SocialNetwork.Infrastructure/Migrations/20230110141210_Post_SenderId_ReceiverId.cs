using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SocialNetwork.Infrastructure.Migrations
{
    public partial class Post_SenderId_ReceiverId : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_UserId",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "Posts",
                newName: "SenderId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_UserId",
                table: "Posts",
                newName: "IX_Posts_SenderId");

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Posts",
                type: "TEXT",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "TEXT");

            migrationBuilder.AddColumn<int>(
                name: "ReceiverId",
                table: "Posts",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Posts_ReceiverId",
                table: "Posts",
                column: "ReceiverId");

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_ReceiverId",
                table: "Posts",
                column: "ReceiverId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_SenderId",
                table: "Posts",
                column: "SenderId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_ReceiverId",
                table: "Posts");

            migrationBuilder.DropForeignKey(
                name: "FK_Posts_Users_SenderId",
                table: "Posts");

            migrationBuilder.DropIndex(
                name: "IX_Posts_ReceiverId",
                table: "Posts");

            migrationBuilder.DropColumn(
                name: "ReceiverId",
                table: "Posts");

            migrationBuilder.RenameColumn(
                name: "SenderId",
                table: "Posts",
                newName: "UserId");

            migrationBuilder.RenameIndex(
                name: "IX_Posts_SenderId",
                table: "Posts",
                newName: "IX_Posts_UserId");

            migrationBuilder.AlterColumn<string>(
                name: "Message",
                table: "Posts",
                type: "TEXT",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "TEXT",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Posts_Users_UserId",
                table: "Posts",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
