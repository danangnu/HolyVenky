import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TsggsChapterPagesService } from '../../_services/tsggs-chapter-pages.service';

@Component({
  selector: 'app-tsggs-chapter-pages',
  templateUrl: './tsggs-chapter-pages.component.html',
  styleUrls: ['./tsggs-chapter-pages.component.css']
})
export class TsggsChapterPagesComponent implements OnInit {
  @ViewChild('AddnewForm') AddnewForm: NgForm;
  model: any = {};
  tsggs_chapter_pages: any;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.AddnewForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private tsggschapterpagesService: TsggsChapterPagesService, private router: Router) { }

  ngOnInit(): void {
  }

  addnew() {
    this.tsggschapterpagesService .AddNew(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    this.AddnewForm.reset(this.tsggs_chapter_pages);
    this.router.navigate(['/schapter']);
  }
}
