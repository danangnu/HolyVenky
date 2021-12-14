import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { TswamiGitaScsvService } from '../../_services/tswami-gita-scsv.service';

@Component({
  selector: 'app-tswami-gita-scsv',
  templateUrl: './tswami-gita-scsv.component.html',
  styleUrls: ['./tswami-gita-scsv.component.css']
})
export class TswamiGitaScsvComponent implements OnInit {
  @ViewChild('AddnewForm') AddnewForm: NgForm;
  model: any = {};
  tswami_gita_scsv: any;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.AddnewForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private tswamiGitaScsvService: TswamiGitaScsvService, private router: Router) { }

  ngOnInit(): void {
  }

  addnew() {
    this.tswamiGitaScsvService .AddNew(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    this.AddnewForm.reset(this.tswami_gita_scsv);
    this.router.navigate(['/purohit']);
  }
}
