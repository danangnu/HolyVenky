import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { TGandhis_quotes } from 'src/app/_models/tgandhis_quotes';
import { UserParams } from 'src/app/_models/userParams';
import { TgandhisQuotesService } from 'src/app/_services/tgandhis-quotes.service';

@Component({
  selector: 'app-gandhi-detail',
  templateUrl: './gandhi-detail.component.html',
  styleUrls: ['./gandhi-detail.component.css']
})
export class GandhiDetailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  tgandhis_quote: TGandhis_quotes;
  tgandhis_quotes: TGandhis_quotes[];
  findForm: FormGroup;
  isDisabled: boolean;
  isLastDisabled: boolean;
  selectedIndex: number;
  rowIndex: number;
  userParams: UserParams;
  pagination: Pagination;

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private tgandhisquotesService: TgandhisQuotesService, private route: ActivatedRoute, private toastr: ToastrService, 
    private router: Router, private fb: FormBuilder) {
      this.userParams = new UserParams();
      this.selectedIndex = Number(this.route.snapshot.paramMap.get('id'));
      if (this.selectedIndex <= 1)
      {
        this.isDisabled = true;
      } else 
      {
        this.isDisabled = false;
      }
      if (localStorage.getItem('field1Search') != null)
        this.userParams.field1 = localStorage.getItem('field1Search');
      if (localStorage.getItem('tgandhis_quotes') != null)
        this.tgandhis_quotes = JSON.parse(localStorage.getItem("tgandhis_quotes"));
      if (localStorage.getItem('rowIndex') != null)
        this.rowIndex = Number(localStorage.getItem('rowIndex'));
     }

  ngOnInit() {
    this.loadGandhi();
    this.tgandhisquotesService.getMax().subscribe((response) => {
      if (this.selectedIndex == response) {
        this.isLastDisabled = true;
      } else {
        this.isLastDisabled = false;
      }
    });
    this.modalForm();
  }

  modalForm() {
    this.findForm = this.fb.group({
      field1: ['', Validators.required],
      pageNumber: [1],
      pageSize: [20]

    });
  }

  onClick() {
    //console.log("Submit button was clicked!" + this.userParams.textData);
    localStorage.setItem("field1Search", this.findForm.value.field1);
    //console.log(this.findForm.value)
    this.loadGandhis();
  }

  onSubmit() {
    //console.log("Form was submitted!");
  }

  loadGandhi() {
    this.tgandhisquotesService.getGandhi(this.route.snapshot.paramMap.get('id')).subscribe(tgandhis_quotes => {
      this.tgandhis_quote = tgandhis_quotes;
    })
  }

  loadGandhis() {
    this.tgandhisquotesService.getGandhis(this.findForm.value).subscribe(response => {
      this.tgandhis_quotes = response.result;
      this.pagination = response.pagination;

      if (localStorage.getItem('field1Search') == null) {
      } else {
        if (localStorage.getItem('rowIndex') != null) {
          this.rowIndex = Number(localStorage.getItem('rowIndex'));
          ++this.rowIndex;
        }
        else {
          this.rowIndex = 0;
          localStorage.setItem("rowIndex", this.rowIndex.toString());
        }
        localStorage.setItem("tgandhis_quotes", JSON.stringify(this.tgandhis_quotes));
      }
      this.selectedIndex = Number(this.tgandhis_quotes[this.rowIndex].id)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/gandhi/' + this.selectedIndex]));
    });
  }

  updateGandhi() {
    this.tgandhisquotesService.updateGandhi(this.tgandhis_quote, this.route.snapshot.paramMap.get('id')).subscribe(() => {
      this.toastr.success('Data updated successfully');
      this.editForm.reset(this.tgandhis_quote);
      this.loadGandhi();
    })
  }

  cancel() {
    this.userParams = new UserParams();
    this.editForm.reset(this.tgandhis_quote);
    localStorage.removeItem('tgandhis_quotes');
    localStorage.removeItem('field1Search');
    localStorage.removeItem('rowIndex');
    this.loadGandhi();
  }

  next() {
    this.route.paramMap.subscribe(params => {
      if (localStorage.getItem('field1Search') == null)
      {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        ++this.selectedIndex;
      } else 
      {
        ++this.rowIndex;
        if (localStorage.getItem('tgandhis_quotes') != null)
          this.tgandhis_quotes = JSON.parse(localStorage.getItem("tgandhis_quotes"));
        localStorage.setItem("rowIndex", this.rowIndex.toString());
        //console.log(this.tbibles[this.rowIndex].id);
        this.selectedIndex = this.tgandhis_quotes[this.rowIndex].id;
      }
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/gandhi/' + this.selectedIndex]));
        this.tgandhisquotesService.getMax().subscribe((response) => {
          if (this.selectedIndex == response) {
            this.isLastDisabled = true;
          } else {
            this.isLastDisabled = false;
          }
        });
    });
 }

  previous() {
    this.route.paramMap.subscribe(params => {
      if (localStorage.getItem('field1Search') == null) {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        --this.selectedIndex;
      } else {
          if (this.rowIndex >= 0) {
            --this.rowIndex;
            if (localStorage.getItem('tgandhis_quotes') != null)
              this.tgandhis_quotes = JSON.parse(localStorage.getItem("tgandhis_quotes"));
            localStorage.setItem("rowIndex", this.rowIndex.toString());
            //console.log(this.tbibles[this.rowIndex].id);
            this.selectedIndex = this.tgandhis_quotes[this.rowIndex].id;
          }
      }
      //console.log(id)
      if (this.selectedIndex >= 0) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/gandhi/' + this.selectedIndex]));
      }
    });
   }

  firsts() {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.selectedIndex = (Number(id));
      this.selectedIndex = 1;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/gandhi/' + this.selectedIndex]));
    });
   }

  resetFilters() {
    this.userParams = new UserParams();
    localStorage.removeItem('tgandhis_quotes');
    localStorage.removeItem('field1Search');
    localStorage.removeItem('rowIndex');
    this.firsts();
  }

  get field1() {
    return this.findForm.get('field1');
  }
}
