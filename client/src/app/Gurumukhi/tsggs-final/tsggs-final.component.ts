import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TsggsFinalService } from '../../_services/tsggs-final.service';

@Component({
  selector: 'app-tsggs-final',
  templateUrl: './tsggs-final.component.html',
  styleUrls: ['./tsggs-final.component.css']
})
export class TsggsFinalComponent implements OnInit {
  @ViewChild('AddnewForm') AddnewForm: NgForm;
  model: any = {};
  tsggs_final: any;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.AddnewForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private tsggs_finalService: TsggsFinalService, private router: Router) { }

  ngOnInit(): void {
  }

  addnew() {
    this.tsggs_finalService.AddNew(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    this.AddnewForm.reset(this.tsggs_final);
    this.router.navigate(['/gurumukhi']);
  }
}
