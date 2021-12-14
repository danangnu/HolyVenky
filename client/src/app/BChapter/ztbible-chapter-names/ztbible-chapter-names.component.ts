import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ZTbibleChapterNamesService } from '../../_services/z-tbible-chapter-names.service';

@Component({
  selector: 'app-ztbible-chapter-names',
  templateUrl: './ztbible-chapter-names.component.html',
  styleUrls: ['./ztbible-chapter-names.component.css']
})
export class ZtbibleChapterNamesComponent implements OnInit {
  @ViewChild('AddnewForm') AddnewForm: NgForm;
  model: any = {};
  ztbible_chapter_names: any;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.AddnewForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private ztbiblechapternamesService: ZTbibleChapterNamesService, private router: Router) { }

  ngOnInit(): void {
  }

  addnew() {
    this.ztbiblechapternamesService .AddNew(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    this.AddnewForm.reset(this.ztbible_chapter_names);
    this.router.navigate(['/bchapter']);
  }
}
