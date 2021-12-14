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

@Component({
  selector: 'app-gurumukhi-list',
  templateUrl: './gurumukhi-list.component.html',
  styleUrls: ['./gurumukhi-list.component.css']
})
export class GurumukhiListComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Line_Number', 'Page_No', 'Verse', 'Comment', 'Gurumukhi', "getdetails"];
  dataSource = new MatTableDataSource<tSGGS_Final>();

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  settings = {
    actions: {
      add: false,
      delete: false,
      edit: true,
      },
    columns: {
      id: {
        title: 'ID'
      },
      line_number: {
        title: 'Line Number'
      },
      page_No: {
        title: 'Page No'
      },
      verse: {
        title: 'Verse'
      },
      field1: {
        title: 'Field1'
      },
      comment: {
        title: 'Comment'
      },
      gurumukhi: {
        title: 'Gurumukhi'
      },
      trans: {
        title: 'Trans',
      },
      gita_Ref: {
        title: 'Gita Ref'
      },
      bible_Ref: {
        title: 'Bible Ref'
      },
      qUran_Ref: {
        title: 'Quran Ref'
      },
      mb_version: {
        title: 'Mb Version',
      },
      raag_english: {
        title: 'Raag English'
      },
      raag_Punjabi: {
        title: 'Raag Punjabi'
      },
      raag_Trans: {
        title: 'Raag_Trans'
      }
    }
  };
  tsggs_final: tSGGS_Final[];
  pagination: Pagination;
  userParams: UserParams;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;

  constructor(private tsggsfinalService: TsggsFinalService, private router: Router, private dialog: MatDialog) {
    this.userParams = new UserParams();
   }

  ngOnInit(): void {
    this.loadGurumukhi();
  }

  onEdit(event: any) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/bibleadd']);
  }

  loadGurumukhi() {
    this.tsggsfinalService.getGurumukhi(this.userParams).subscribe(response => {
      this.tsggs_final = response.result;
      this.pagination = response.pagination;
      this.itemsPerPage = Number(this.pagination.itemsPerPage);
      this.currentPage = Number(this.pagination.currentPage);
      this.totalItems = Number(this.pagination.totalItems);
    });
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event;
    this.loadGurumukhi();
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadGurumukhi();
  }
}
