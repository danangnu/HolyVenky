using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace API.Data.Migrations
{
    public partial class LatestTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Hadiths",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Field2 = table.Column<string>(type: "text", nullable: true),
                    Field1 = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hadiths", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tBible",
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
                    SSGSahib = table.Column<string>(type: "text", nullable: true),
                    MBs_version = table.Column<string>(type: "text", nullable: true),
                    Readers_comment = table.Column<string>(type: "text", nullable: true),
                    BTags = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tBible", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "tblsggs",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    BookTitle = table.Column<string>(type: "text", nullable: true),
                    REf = table.Column<string>(type: "text", nullable: true),
                    TextData = table.Column<string>(type: "text", nullable: true),
                    Verse_Length = table.Column<int>(type: "integer", nullable: true),
                    Gita = table.Column<string>(type: "text", nullable: true),
                    Quran = table.Column<string>(type: "text", nullable: true),
                    Bible = table.Column<string>(type: "text", nullable: true),
                    MBs_version = table.Column<string>(type: "text", nullable: true),
                    Readers_comment = table.Column<string>(type: "text", nullable: true),
                    BTags = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tblsggs", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "TGandhis_quotes",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Field1 = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TGandhis_quotes", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Tsggs_chapter___pages",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Order_in_SGGS = table.Column<int>(type: "integer", nullable: false),
                    Chapter___ragas = table.Column<string>(type: "text", nullable: true),
                    Page_Range = table.Column<string>(type: "text", nullable: true),
                    Page_Count = table.Column<int>(type: "integer", nullable: false),
                    Gurumkhi = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Tsggs_chapter___pages", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "tSGGS_Final",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    line_number = table.Column<double>(type: "double precision", nullable: false),
                    page_No = table.Column<string>(type: "text", nullable: true),
                    vERSE = table.Column<string>(type: "text", nullable: true),
                    Field1 = table.Column<string>(type: "text", nullable: true),
                    comment = table.Column<string>(type: "text", nullable: true),
                    Gurumukhi = table.Column<string>(type: "text", nullable: true),
                    Trans = table.Column<string>(type: "text", nullable: true),
                    Gita_Ref = table.Column<string>(type: "text", nullable: true),
                    Bible_Ref = table.Column<string>(type: "text", nullable: true),
                    QUran_Ref = table.Column<string>(type: "text", nullable: true),
                    Mb_version = table.Column<string>(type: "text", nullable: true),
                    Raag_english = table.Column<string>(type: "text", nullable: true),
                    Raag_Punjabi = table.Column<string>(type: "text", nullable: true),
                    Raag_Trans = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tSGGS_Final", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "tswami_gita_scsv",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    VERSE = table.Column<string>(type: "text", nullable: true),
                    COMMENT = table.Column<string>(type: "text", nullable: true),
                    Chapter = table.Column<string>(type: "text", nullable: true),
                    IGS = table.Column<string>(type: "text", nullable: true),
                    NUMBER = table.Column<double>(type: "double precision", nullable: false),
                    TRANSLITERATION = table.Column<string>(type: "text", nullable: true),
                    Gita = table.Column<string>(type: "text", nullable: true),
                    Bible_Link = table.Column<string>(type: "text", nullable: true),
                    Quran = table.Column<string>(type: "text", nullable: true),
                    SSGSahib = table.Column<string>(type: "text", nullable: true),
                    MBVersion = table.Column<string>(type: "text", nullable: true),
                    readers_Comments = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_tswami_gita_scsv", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserName = table.Column<string>(type: "text", nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "bytea", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "bytea", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ytquran",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ChaperNVerse = table.Column<double>(type: "double precision", nullable: true),
                    Verse = table.Column<string>(type: "text", nullable: true),
                    Sura = table.Column<string>(type: "text", nullable: true),
                    Location = table.Column<string>(type: "text", nullable: true),
                    OrderRevealed = table.Column<string>(type: "text", nullable: true),
                    Gita_Link = table.Column<string>(type: "text", nullable: true),
                    Bible_Link = table.Column<string>(type: "text", nullable: true),
                    Commentary = table.Column<string>(type: "text", nullable: true),
                    MB_s_Version = table.Column<string>(type: "text", nullable: true),
                    Number = table.Column<string>(type: "text", nullable: true),
                    VLen = table.Column<int>(type: "integer", nullable: true),
                    IDs = table.Column<bool>(type: "boolean", nullable: false),
                    truncated_ = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ytquran", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "zTbible_Chapter_Names",
                columns: table => new
                {
                    ID = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Field2 = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_zTbible_Chapter_Names", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "Ztgita_Full",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Ref = table.Column<string>(type: "text", nullable: true),
                    Verse = table.Column<string>(type: "text", nullable: true),
                    Verse_Length = table.Column<int>(type: "integer", nullable: true),
                    Readers_Comments = table.Column<string>(type: "text", nullable: true),
                    Field1 = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ztgita_Full", x => x.id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Hadiths");

            migrationBuilder.DropTable(
                name: "tBible");

            migrationBuilder.DropTable(
                name: "tblsggs");

            migrationBuilder.DropTable(
                name: "TGandhis_quotes");

            migrationBuilder.DropTable(
                name: "Tsggs_chapter___pages");

            migrationBuilder.DropTable(
                name: "tSGGS_Final");

            migrationBuilder.DropTable(
                name: "tswami_gita_scsv");

            migrationBuilder.DropTable(
                name: "Users");

            migrationBuilder.DropTable(
                name: "ytquran");

            migrationBuilder.DropTable(
                name: "zTbible_Chapter_Names");

            migrationBuilder.DropTable(
                name: "Ztgita_Full");
        }
    }
}
