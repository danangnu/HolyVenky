using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

namespace API.Data.Migrations
{
    public partial class Addtblsggs : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "NUMBER",
                table: "tswami_gita_scsv",
                type: "double precision",
                nullable: false,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.CreateTable(
                name: "tblsggs",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BookTitle = table.Column<string>(type: "text", nullable: true),
                    REf = table.Column<string>(type: "text", nullable: true),
                    TextData = table.Column<string>(type: "text", nullable: true),
                    Verse_Length = table.Column<int>(type: "integer", nullable: false),
                    Gita = table.Column<string>(type: "text", nullable: true),
                    Quran = table.Column<string>(type: "text", nullable: true),
                    Bible = table.Column<string>(type: "text", nullable: true),
                    MBs_version = table.Column<string>(type: "text", nullable: true),
                    Readers_comment = table.Column<string>(type: "text", nullable: true),
                    BTags = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_sggs", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "tblsggs");

            migrationBuilder.AlterColumn<int>(
                name: "NUMBER",
                table: "tswami_gita_scsv",
                type: "integer",
                nullable: false,
                oldClrType: typeof(double),
                oldType: "double precision");
        }
    }
}
