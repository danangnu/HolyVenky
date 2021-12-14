import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { Tsggs_chapter_pages } from 'src/app/_models/tsggs_chapter_pages';
import { UserParams } from 'src/app/_models/userParams';
import { TsggsChapterPagesService } from 'src/app/_services/tsggs-chapter-pages.service';

@Component({
  selector: 'app-schapter-list',
  templateUrl: './schapter-list.component.html',
  styleUrls: ['./schapter-list.component.css']
})
export class SchapterListComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Order_in_SGGS', 'Chapter_ragas', "getdetails"];
  dataSource = new MatTableDataSource<Tsggs_chapter_pages>();

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
      order_in_SGGS: {
        title: 'Order in SGGS'
      },
      chapter___ragas: {
        title: 'Chapter Ragas'
      },
      page_Range: {
        title: 'Page Range'
      },
      page_Count: {
        title: 'Page Count'
      },
      gurumkhi: {
        title: 'Gurumkhi'
      }
    }
  };
  tsggs_chapter_pages: Tsggs_chapter_pages[];
  pagination: Pagination;
  userParams: UserParams;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;

  constructor(private tsggschapterpagesService: TsggsChapterPagesService, private router: Router, private dialog: MatDialog) {
    this.userParams = new UserParams();
   }

  ngOnInit(): void {
    this.loadSChapter();
  }

  onEdit(event: any) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/bibleadd']);
  }

  loadSChapter() {
    this.tsggschapterpagesService.getSChapters(this.userParams).subscribe(response => {
      this.tsggs_chapter_pages = response.result;
      this.pagination = response.pagination;
      this.itemsPerPage = Number(this.pagination.itemsPerPage);
      this.currentPage = Number(this.pagination.currentPage);
      this.totalItems = Number(this.pagination.totalItems);
    });
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event;
    this.loadSChapter();
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadSChapter();
  }
}
