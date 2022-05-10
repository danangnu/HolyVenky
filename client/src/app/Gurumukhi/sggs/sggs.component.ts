import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { Tblsggs } from 'src/app/_models/tblsggs';
import { UserParams } from 'src/app/_models/userParams';
import { SggsService } from 'src/app/_services/sggs.service';

@Component({
  selector: 'app-sggs',
  templateUrl: './sggs.component.html',
  styleUrls: ['./sggs.component.css']
})
export class SggsComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  sggs: Tblsggs;
  tsggs: Tblsggs[];
  findForm: FormGroup;
  isDisabled: boolean;
  selectedIndex: number;
  rowIndex: number;
  userParams: UserParams;
  pagination: Pagination;
  languageObjects : fSggs[];

  constructor(private sggsService: SggsService, private route: ActivatedRoute, private toastr: ToastrService, 
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
      if (localStorage.getItem('verseSearch') != null)
        this.userParams.textData = localStorage.getItem('verseSearch');
      if (localStorage.getItem('cSearch') != null)
        this.userParams.bookTitle = localStorage.getItem('cSearch');
      if (localStorage.getItem('tsggs') != null)
        this.tsggs = JSON.parse(localStorage.getItem("tsggs"));
      if (localStorage.getItem('rowIndex') != null)
        this.rowIndex = Number(localStorage.getItem('rowIndex'));
      this.languageObjects = [
          {id: "all", name: "All Fields"},
          {id: "bookTitle", name: "Chapter"},
          {id: "textData", name: "Verse"},
          {id: "gita", name: "Gita"},
          {id: "quran", name: "Quran"}
        ]
     }
  

  ngOnInit(): void {
    this.loadSggs();
    this.sggsService.getMax().subscribe((response) => {
      if (this.selectedIndex == response) {
        this.isDisabled = true;
      } else {
        this.isDisabled = false;
      }
    });
    this.modalForm();

    this.setDefaultValue();
  }

  setDefaultValue(){
    this.findForm.patchValue({
      bookTitle : this.languageObjects[0].id
    })
  }

  modalForm() {
    this.findForm = this.fb.group({
      textData: ['', Validators.required],
      bookTitle: [''],
      pageNumber: [1],
      pageSize: [20]

    });
  }

  onClick() {
    //console.log("Submit button was clicked!" + this.userParams.textData);
    localStorage.setItem("verseSearch", this.findForm.value.textData);
    localStorage.setItem("cSearch", this.findForm.value.bookTitle);
    //console.log(this.findForm.value)
    this.loadTSggs();
  }

  onSubmit() {
    //console.log("Form was submitted!");
  }

  loadSggs() {
    this.sggsService.getTSggs(this.route.snapshot.paramMap.get('id')).subscribe(sggs => {
      this.sggs = sggs;
    })
  }

  loadTSggs() {
    this.sggsService.getSggs(this.findForm.value).subscribe(response => {
      this.tsggs = response.result;
      this.pagination = response.pagination;

      if (localStorage.getItem('verseSearch') == null) {
      } else {
        if (localStorage.getItem('rowIndex') != null) {
          this.rowIndex = Number(localStorage.getItem('rowIndex'));
          ++this.rowIndex;
        }
        else {
          this.rowIndex = 0;
          localStorage.setItem("rowIndex", this.rowIndex.toString());
        }
        localStorage.setItem("tsggs", JSON.stringify(this.tsggs));
      }
      this.selectedIndex = Number(this.tsggs[this.rowIndex].id)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/gurumukhi/' + this.selectedIndex]));
    });
  }

  updateSggs() {
    this.sggsService.updateSggs(this.sggs, this.route.snapshot.paramMap.get('id')).subscribe(() => {
      this.toastr.success('Data updated successfully');
      this.editForm.reset(this.sggs);
      this.loadSggs();
    });
  }

  cancel() {
    this.userParams = new UserParams();
    this.editForm.reset(this.sggs);
    localStorage.removeItem('tsggs');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('cSearch');
    localStorage.removeItem('rowIndex');
    this.loadSggs();
  }

  next() {
    this.route.paramMap.subscribe(params => {
      if (localStorage.getItem('verseSearch') == null)
      {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        ++this.selectedIndex;
      } else 
      {
        ++this.rowIndex;
        if (localStorage.getItem('tsggs') != null)
          this.tsggs = JSON.parse(localStorage.getItem("tsggs"));
        localStorage.setItem("rowIndex", this.rowIndex.toString());
        //console.log(this.tbibles[this.rowIndex].id);
        this.selectedIndex = this.tsggs[this.rowIndex].id;
      }
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/gurumukhi/' + this.selectedIndex]));
        this.sggsService.getMax().subscribe((response) => {
          if (this.selectedIndex == response) {
            this.isDisabled = true;
          } else {
            this.isDisabled = false;
          }
        });
    });
 }

  previous() {
    this.route.paramMap.subscribe(params => {
      if (localStorage.getItem('verseSearch') == null && localStorage.getItem('cSearch') == null) {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        --this.selectedIndex;
      } else {
          if (this.rowIndex >= 0) {
            --this.rowIndex;
            if (localStorage.getItem('tsggs') != null)
              this.tsggs = JSON.parse(localStorage.getItem("tsggs"));
            localStorage.setItem("rowIndex", this.rowIndex.toString());
            //console.log(this.tbibles[this.rowIndex].id);
            this.selectedIndex = this.tsggs[this.rowIndex].id;
          }
      }
      //console.log(id)
      if (this.selectedIndex >= 0) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/gurumukhi/' + this.selectedIndex]));
      }
    });
   }

  firsts() {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.selectedIndex = (Number(id));
      this.selectedIndex = 1;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/gurumukhi/' + this.selectedIndex]));
    });
   }

  resetFilters() {
    this.userParams = new UserParams();
    localStorage.removeItem('tsggs');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('cSearch');
    localStorage.removeItem('rowIndex');
    this.firsts();
  }

  get textData() {
    return this.findForm.get('textData');
  }
  
  get bookTitle() {
    return this.findForm.get('bookTitle');
  }
}

interface fSggs{
  id:string;
  name:string;
}