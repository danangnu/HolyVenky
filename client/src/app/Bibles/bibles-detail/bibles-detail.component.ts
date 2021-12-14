import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { TBible } from 'src/app/_models/tbible';
import { UserParams } from 'src/app/_models/userParams';
import { TBibleService } from 'src/app/_services/tbible.service';

@Component({
  selector: 'app-bibles-detail',
  templateUrl: './bibles-detail.component.html',
  styleUrls: ['./bibles-detail.component.css']
})

export class BiblesDetailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  @ViewChild('Form') searchForm: NgForm;
  @ViewChild('verseSearch') verseSearch: ElementRef<HTMLInputElement>;
  @ViewChild('chapterSearch') chapterSearch: ElementRef<HTMLInputElement>;
  tbible: TBible;
  tbibles: TBible[];
  findForm: FormGroup;
  isDisabled: boolean;
  selectedIndex: number;
  rowIndex: number;
  userParams: UserParams;
  pagination: Pagination;
  languageObjects : fBible[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      this.updateBible();
      $event.returnValue = true;
    }
  }
  
  constructor(private tbibleService: TBibleService, private route: ActivatedRoute, private toastr: ToastrService, 
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
      if (localStorage.getItem('tbibles') != null)
        this.tbibles = JSON.parse(localStorage.getItem("tbibles"));
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
    this.loadBible();
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
    this.loadBibles();
  }

  onSubmit() {
    //console.log("Form was submitted!");
  }

  loadBible() {
    this.tbibleService.getBible1(this.route.snapshot.paramMap.get('id')).subscribe(tbible => {
      this.tbible = tbible;
    })
  }

  loadBibles() {
    this.tbibleService.getBible(this.findForm.value).subscribe(response => {
      this.tbibles = response.result;
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
        localStorage.setItem("tbibles", JSON.stringify(this.tbibles));
      }
      this.selectedIndex = Number(this.tbibles[this.rowIndex].id)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/bibles/' + this.selectedIndex]));
    });
  }

  onVerseChange(verseSearch: any) {
    //console.log('here');  

    this.verseSearch = verseSearch;
  }
  
  updateBible() {
    this.tbibleService.updateMember(this.tbible, this.route.snapshot.paramMap.get('id')).subscribe(() => {
      this.toastr.success('Data updated successfully');
      this.editForm.reset(this.tbible);
      this.loadBible();
    })
  }

  cancel() {
    this.userParams = new UserParams();
    this.editForm.reset(this.tbible);
    localStorage.removeItem('tbibles');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('cSearch');
    localStorage.removeItem('rowIndex');
    this.loadBible();
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
        if (localStorage.getItem('tbibles') != null)
          this.tbibles = JSON.parse(localStorage.getItem("tbibles"));
        localStorage.setItem("rowIndex", this.rowIndex.toString());
        //console.log(this.tbibles[this.rowIndex].id);
        this.selectedIndex = this.tbibles[this.rowIndex].id;
      }
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/bibles/' + this.selectedIndex]));
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
          if (localStorage.getItem('tbibles') != null)
            this.tbibles = JSON.parse(localStorage.getItem("tbibles"));
          localStorage.setItem("rowIndex", this.rowIndex.toString());
          //console.log(this.tbibles[this.rowIndex].id);
          this.selectedIndex = this.tbibles[this.rowIndex].id;
        }
    }
    //console.log(id)
    if (this.selectedIndex >= 0) {
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/bibles/' + this.selectedIndex]));
    }
  });
 }

 addnew() {
   //Nothing
 }

 firsts() {
  this.route.paramMap.subscribe(params => {
    var id = params.get('id');
    this.selectedIndex = (Number(id));
    this.selectedIndex = 1;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/bibles/' + this.selectedIndex]));
  });
 }

 resetFilters() {
  this.userParams = new UserParams();
  localStorage.removeItem('tbibles');
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

interface fBible{
  id:string;
  name:string;
}