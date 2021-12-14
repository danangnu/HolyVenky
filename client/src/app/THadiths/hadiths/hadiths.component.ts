import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { HadithsService } from '../../_services/hadiths.service';

@Component({
  selector: 'app-hadiths',
  templateUrl: './hadiths.component.html',
  styleUrls: ['./hadiths.component.css']
})
export class HadithsComponent implements OnInit {
  @ViewChild('AddnewForm') AddnewForm: NgForm;
  model: any = {};
  hadiths: any;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.AddnewForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private hadithsService: HadithsService, private router: Router) { }

  ngOnInit(): void {
  }

  addnew() {
    this.hadithsService.AddNew(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    this.AddnewForm.reset(this.hadiths);
    this.router.navigate(['/thadiths']);
  }
}
