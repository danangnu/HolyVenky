import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TBible } from 'src/app/_models/tbible';
import { TBibleService } from '../../_services/tbible.service';

@Component({
  selector: 'app-tbible',
  templateUrl: './tbible.component.html',
  styleUrls: ['./tbible.component.css']
})
export class TbibleComponent implements OnInit {
  @ViewChild('AddnewForm') AddnewForm: NgForm;
  tbible: TBible;
  tbibleForm: FormGroup;
  validationErrors: string[] = [];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.AddnewForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private http: HttpClient, private tbibleService: TBibleService, private router: Router, 
    private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.tbibleForm = this.fb.group({
      bookTitle: ['', Validators.required],
      rEf: [],
      textData: ['', Validators.required],
      verse_Length: ['', Validators.required],
      gita: [],
      quran: [],
      ssgSahib: [],
      mBs_version: [],
      readers_comment: [],
      bTags: []
    });
  }

  addnew() {
    this.tbibleService.AddNew(this.tbibleForm.value).subscribe(response => {
      this.router.navigate(['/bibles/' + response.id]);
    }, error => {
      this.validationErrors = error;
    })
  }

  cancel() {
    //this.AddnewForm.reset(this.tbible);
    this.router.navigate(['/bibles/1']);
  }
}
