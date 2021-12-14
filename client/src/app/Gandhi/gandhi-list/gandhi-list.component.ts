import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Pagination } from 'src/app/_models/pagination';
import { TGandhis_quotes } from 'src/app/_models/tgandhis_quotes';
import { UserParams } from 'src/app/_models/userParams';
import { TgandhisQuotesService } from 'src/app/_services/tgandhis-quotes.service';


@Component({
  selector: 'app-gandhi-list',
  templateUrl: './gandhi-list.component.html',
  styleUrls: ['./gandhi-list.component.css']
})
export class GandhiListComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Field1', "getdetails"];
  dataSource = new MatTableDataSource<TGandhis_quotes>();

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
      field1: {
        title: 'Field1'
      }
    }
  };
  tgandhis_quotes: TGandhis_quotes[];
  pagination: Pagination;
  userParams: UserParams;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;

  constructor(private tgandhisquotesService: TgandhisQuotesService, private router: Router,private dialog: MatDialog) {
    this.userParams = new UserParams();
   }

  ngOnInit(): void {
    this.loadGandhi();
  }

  onEdit(event: any) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/bibleadd']);
  }

  loadGandhi() {
    this.tgandhisquotesService.getGandhis(this.userParams).subscribe(response => {
      this.tgandhis_quotes = response.result;
      this.pagination = response.pagination;
      this.itemsPerPage = Number(this.pagination.itemsPerPage);
      this.currentPage = Number(this.pagination.currentPage);
      this.totalItems = Number(this.pagination.totalItems);
    });
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event;
    this.loadGandhi();
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadGandhi();
  }
}
