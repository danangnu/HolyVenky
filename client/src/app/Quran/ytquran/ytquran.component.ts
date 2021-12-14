import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { YtquranService } from '../../_services/ytquran.service';

@Component({
  selector: 'app-ytquran',
  templateUrl: './ytquran.component.html',
  styleUrls: ['./ytquran.component.css']
})
export class YtquranComponent implements OnInit {
  @ViewChild('AddnewForm') AddnewForm: NgForm;
  model: any = {};
  ytquran: any;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.AddnewForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private ytquranService: YtquranService, private router: Router) { }

  ngOnInit(): void {
  }

  addnew() {
    this.ytquranService.AddNew(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    this.AddnewForm.reset(this.ytquran);
    this.router.navigate(['/quran']);
  }
}
