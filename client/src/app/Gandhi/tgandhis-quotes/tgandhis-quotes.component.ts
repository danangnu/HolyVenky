import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TgandhisQuotesService } from '../../_services/tgandhis-quotes.service';

@Component({
  selector: 'app-tgandhis-quotes',
  templateUrl: './tgandhis-quotes.component.html',
  styleUrls: ['./tgandhis-quotes.component.css']
})
export class TgandhisQuotesComponent implements OnInit {
  @ViewChild('AddnewForm') AddnewForm: NgForm;
  model: any = {};
  tgandhis_quotes: any;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.AddnewForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private tgandhisquotesService: TgandhisQuotesService, private router: Router) { }

  ngOnInit(): void {
  }

  addnew() {
    this.tgandhisquotesService.AddNew(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    this.AddnewForm.reset(this.tgandhis_quotes);
    this.router.navigate(['/gandhi']);
  }
}
