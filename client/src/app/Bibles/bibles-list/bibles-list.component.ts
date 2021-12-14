import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { TBible } from 'src/app/_models/tbible';
import { UserParams } from 'src/app/_models/userParams';
import { TBibleService } from 'src/app/_services/tbible.service';

@Component({
  selector: 'app-bibles-list',
  templateUrl: './bibles-list.component.html',
  styleUrls: ['./bibles-list.component.css']
})
export class BiblesListComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'BookTitle', 'Ref', 'TextData', 'verse_Length' ,'quran', "getdetails"];
  dataSource = new MatTableDataSource<TBible>();
  quranRow = '#37f137';

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  
  tbible: TBible[];
  pagination: Pagination;
  userParams: UserParams;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
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
      bookTitle: {
        title: 'BookTitle'
      },
      rEf: {
        title: 'REf'
      },
      textData: {
        title: 'TextData'
      },
      verse_Length: {
        title: 'Verse Length'
      },
      gita: {
        title: 'Gita'
      },
      quran: {
        title: 'Quran'
      },
      ssgSahib: {
        title: 'SSGSahib',
      },
      mBs_version: {
        title: 'MBs Version'
      },
      readers_comment: {
        title: 'Readers Comment'
      },
      bTags: {
        title: 'BTags'
      }
    }
  };

  constructor(private tbibleService: TBibleService, private router: Router, private dialog: MatDialog) {
    this.userParams = new UserParams();
   }

  onEdit(event: any) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/bibleadd']);
  }

  ngOnInit(): void {
    this.loadBible();
  }

  loadBible() {
    this.tbibleService.getBible(this.userParams).subscribe(response => {
      this.tbible = response.result;
      this.pagination = response.pagination;
      this.itemsPerPage = Number(this.pagination.itemsPerPage);
      this.currentPage = Number(this.pagination.currentPage);
      this.totalItems = Number(this.pagination.totalItems);
    });
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event;
    this.loadBible();
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadBible();
  }
}
