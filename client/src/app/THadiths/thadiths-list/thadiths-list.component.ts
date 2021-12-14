import { Component, ViewChild, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hadiths } from 'src/app/_models/hadiths';
import { HadithsService } from 'src/app/_services/hadiths.service';
import { MatDialog } from '@angular/material/dialog';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';

@Component({
  selector: 'app-thadiths-list',
  templateUrl: './thadiths-list.component.html',
  styleUrls: ['./thadiths-list.component.css']
})
export class ThadithsListComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Field2', 'Field1', "getdetails"];
  dataSource = new MatTableDataSource<Hadiths>();

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
      },
      field1: {
        title: 'Field1'
      }
    }
  };
  hadiths: Hadiths[];
  pagination: Pagination;
  userParams: UserParams;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;
  
  constructor(private hadithsService: HadithsService, private router: Router, private dialog: MatDialog) {
    this.userParams = new UserParams();
   }

  ngOnInit(): void {
    this.loadTHadiths();
  }

  onEdit(event: any) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/bibleadd']);
  }

  loadTHadiths() {
    this.hadithsService.getTHadiths(this.userParams).subscribe(response => {
      this.hadiths = response.result;
      this.pagination = response.pagination;
      this.itemsPerPage = Number(this.pagination.itemsPerPage);
      this.currentPage = Number(this.pagination.currentPage);
      this.totalItems = Number(this.pagination.totalItems);
    });
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event;
    this.loadTHadiths();
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadTHadiths();
  }
}
