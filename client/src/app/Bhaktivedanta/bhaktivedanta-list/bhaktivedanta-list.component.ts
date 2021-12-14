import { Component, ViewChild, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { Ztgita_Full } from 'src/app/_models/ztgita_full';
import { ZtgitaFullService } from 'src/app/_services/ztgita-full.service';

@Component({
  selector: 'app-bhaktivedanta-list',
  templateUrl: './bhaktivedanta-list.component.html',
  styleUrls: ['./bhaktivedanta-list.component.css']
})
export class BhaktivedantaListComponent implements OnInit {
  displayedColumns: string[] = ['Id', 'Ref', 'Verse', 'Verse_Length', "getdetails"];
  dataSource = new MatTableDataSource<Ztgita_Full>();

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
      ref: {
        title: 'Ref'
      },
      verse: {
        title: 'Verse'
      },
      verse_Length: {
        title: 'Verse Length'
      },
      readers_Comments: {
        title: 'Readers Comments'
      },
      field1: {
        title: 'Field1'
      }
    }
  };
  ztgita_full: Ztgita_Full[];
  pagination: Pagination;
  userParams: UserParams;
  itemsPerPage: number;
  currentPage: number;
  totalItems: number;

  constructor(private ztgitafullService: ZtgitaFullService, private router: Router, private dialog: MatDialog) {
    this.userParams = new UserParams();
   }

  ngOnInit(): void {
    this.loadBhaktivedanta();
  }

  onEdit(event: any) {
    // alert(`Custom event '${event.action}' fired on row №: ${event.data.id}`);
    this.router.navigate(['/bibleadd']);
  }

  loadBhaktivedanta() {
    this.ztgitafullService.getBhaktivedantas(this.userParams).subscribe(response => {
      this.ztgita_full = response.result;
      this.pagination = response.pagination;
      this.itemsPerPage = Number(this.pagination.itemsPerPage);
      this.currentPage = Number(this.pagination.currentPage);
      this.totalItems = Number(this.pagination.totalItems);
    });
  }

  onPageChanged(event: any) {
    this.userParams.pageNumber = event;
    this.loadBhaktivedanta();
  }

  resetFilters() {
    this.userParams = new UserParams();
    this.loadBhaktivedanta();
  }
}
