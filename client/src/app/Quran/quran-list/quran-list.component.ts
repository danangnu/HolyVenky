import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { ytquran } from 'src/app/_models/ytquran';
import { YtquranService } from 'src/app/_services/ytquran.service';

@Component({
  selector: 'app-quran-list',
  templateUrl: './quran-list.component.html',
  styleUrls: ['./quran-list.component.css']
})
export class QuranListComponent implements OnInit {
  displayedColumns: string[] = ['ID', 'Verse', 'Sura', 'Location', 'OrderRevealed', 'Number', "getdetails"];
  dataSource = new MatTableDataSource<ytquran>();

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
      chaperNVerse: {
        title: 'Chapter And Verse'
      },
      verse: {
        title: 'Verse'
      },
      sura: {
        title: 'Sura'
      },
      location: {
        title: 'Location'
      },
      orderRevealed: {
        title: 'Order Revealed'
      },
      gita_Link: {
        title: 'Gita Link'
      },
      bible_Link: {
        title: 'Bible Link',
      },
      commentary: {
        title: 'Commentary'
      },
      mB_s_Version: {
        title: 'MBs Version'
      },
      number: {
        title: 'Number'
      },
      vLen: {
        title: 'VLen',
      },
      iDs: {
        title: 'IDs'
      },
      truncated_: {
        title: 'Truncated'
      }
    }
  };
  ytquran: ytquran[];
  pagination: Pagination;
  userParams: UserParams;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;

  constructor(private ytquranService: YtquranService, private router: Router, private dialog: MatDialog) {
    this.userParams = new UserParams();
   }

  ngOnInit(): void {
    this.loadQuran();
  }

  onEdit(event: any) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/bibleadd']);
  }

  loadQuran() {
    this.ytquranService.getQurans(this.userParams).subscribe(response => {
      this.ytquran = response.result;
      this.pagination = response.pagination;
      this.itemsPerPage = Number(this.pagination.itemsPerPage);
      this.currentPage = Number(this.pagination.currentPage);
      this.totalItems = Number(this.pagination.totalItems);
    });
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event;
    this.loadQuran();
  }
  
  resetFilters() {
    this.userParams = new UserParams();
    this.loadQuran();
  }
}
