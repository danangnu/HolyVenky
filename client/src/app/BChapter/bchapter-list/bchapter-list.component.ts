import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { zTbible_Chapter_Names } from 'src/app/_models/ztbible_chapter_names';
import { ZTbibleChapterNamesService } from 'src/app/_services/z-tbible-chapter-names.service';

@Component({
  selector: 'app-bchapter-list',
  templateUrl: './bchapter-list.component.html',
  styleUrls: ['./bchapter-list.component.css']
})
export class BchapterListComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Field2', "getdetails"];
  dataSource = new MatTableDataSource<zTbible_Chapter_Names>();

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
      field2: {
        title: 'Field2'
      }
    }
  };
  ztbible_chapter_names: zTbible_Chapter_Names[];
  pagination: Pagination;
  userParams: UserParams;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;

  constructor(private ztbiblechapternamesService: ZTbibleChapterNamesService, private router: Router, private dialog: MatDialog) {
    this.userParams = new UserParams();
   }

  ngOnInit(): void {
    this.loadBChapter();
  }

  onEdit(event: any) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/bibleadd']);
  }

  loadBChapter() {
    this.ztbiblechapternamesService.getBChapters(this.userParams).subscribe(response => {
      this.ztbible_chapter_names = response.result;
      this.pagination = response.pagination;
      this.itemsPerPage = Number(this.pagination.itemsPerPage);
      this.currentPage = Number(this.pagination.currentPage);
      this.totalItems = Number(this.pagination.totalItems);
    });
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event;
    this.loadBChapter();
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadBChapter();
  }
}
