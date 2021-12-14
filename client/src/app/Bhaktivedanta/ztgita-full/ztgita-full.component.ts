import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ZtgitaFullService } from '../../_services/ztgita-full.service';

@Component({
  selector: 'app-ztgita-full',
  templateUrl: './ztgita-full.component.html',
  styleUrls: ['./ztgita-full.component.css']
})
export class ZtgitaFullComponent implements OnInit {
  @ViewChild('AddnewForm') AddnewForm: NgForm;
  model: any = {};
  ztgita_full: any;
  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.AddnewForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private ztgitafullService: ZtgitaFullService, private router: Router) { }

  ngOnInit(): void {
  }

  addnew() {
    this.ztgitafullService.AddNew(this.model).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    })
  }

  cancel() {
    this.AddnewForm.reset(this.ztgita_full);
    this.router.navigate(['/bhaktivedanta']);
  }
}
