import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { tSGGS_Final } from 'src/app/_models/tsggs_final';
import { tswami_gita_scsv } from 'src/app/_models/tswami_gita_scsv';
import { UserParams } from 'src/app/_models/userParams';
import { TsggsFinalService } from 'src/app/_services/tsggs-final.service';
import { TswamiGitaScsvService } from 'src/app/_services/tswami-gita-scsv.service';

@Component({
  selector: 'app-purohit-list',
  templateUrl: './purohit-list.component.html',
  styleUrls: ['./purohit-list.component.css']
})
export class PurohitListComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Verse', 'Comment', 'Chapter', 'IGS', "getdetails"];
  dataSource = new MatTableDataSource<tswami_gita_scsv>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  settings = {
    actions: {
      add: false,
      delete: false,
      edit: true,
      },
    columns: {
      id: {
        title: 'Id'
      },
      verse: {
        title: 'Verse'
      },
      comment: {
        title: 'Comment'
      },
      chapter: {
        title: 'Chapter'
      },
      igs: {
        title: 'IGS'
      },
      number: {
        title: 'Number'
      },
      transliteration: {
        title: 'Transliteration'
      },
      gita: {
        title: 'Gita',
      },
      bible_Link: {
        title: 'Bible Link'
      },
      quran: {
        title: 'Quran'
      },
      ssgSahib: {
        title: 'SSGSahib'
      },
      mbVersion: {
        title: 'MB Version',
      },
      readers_Comments: {
        title: 'Readers Comments'
      }
    }
  };
  tswami_gita_scsv: tswami_gita_scsv[];
  pagination: Pagination;
  userParams: UserParams;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;

  constructor(private tswamigitascsvService: TswamiGitaScsvService, private router: Router, private dialog: MatDialog) {
    this.userParams = new UserParams();
   }

  ngOnInit(): void {
    this.loadPurohit();
  }

  onEdit(event: any) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/bibleadd']);
  }

  loadPurohit() {
    this.tswamigitascsvService.getPurohits(this.userParams).subscribe(response => {
      this.tswami_gita_scsv = response.result;
      this.pagination = response.pagination;
      this.itemsPerPage = Number(this.pagination.itemsPerPage);
      this.currentPage = Number(this.pagination.currentPage);
      this.totalItems = Number(this.pagination.totalItems);
    });
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event;
    this.loadPurohit();
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadPurohit();
  }
}
