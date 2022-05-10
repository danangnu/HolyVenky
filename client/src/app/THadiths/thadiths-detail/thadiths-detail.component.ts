import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Hadiths } from 'src/app/_models/hadiths';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { HadithsService } from 'src/app/_services/hadiths.service';

@Component({
  selector: 'app-thadiths-detail',
  templateUrl: './thadiths-detail.component.html',
  styleUrls: ['./thadiths-detail.component.css']
})
export class ThadithsDetailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  hadith: Hadiths;
  hadiths: Hadiths[];
  findForm: FormGroup;
  isDisabled: boolean;
  selectedIndex: number;
  rowIndex: number;
  userParams: UserParams;
  pagination: Pagination;
  languageObjects : fHadith[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private hadithsService: HadithsService, private route: ActivatedRoute, private toastr: ToastrService, 
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
        this.userParams.verse = localStorage.getItem('verseSearch');
      if (localStorage.getItem('commentSearch') != null)
        this.userParams.comment = localStorage.getItem('commentSearch');
      if (localStorage.getItem('hadiths') != null)
        this.hadiths = JSON.parse(localStorage.getItem("hadiths"));
      if (localStorage.getItem('rowIndex') != null)
        this.rowIndex = Number(localStorage.getItem('rowIndex'));
      this.languageObjects = [
          {id: "all", name: "All Fields"},
          {id: "field1", name: "Field1"},
          {id: "field2", name: "Field2"}
        ]
     }

  ngOnInit(): void {
    this.loadHadith();
    this.modalForm();
    this.setDefaultValue();
  }

  setDefaultValue(){
    this.findForm.patchValue({
      comment : this.languageObjects[0].id
    })
  }

  modalForm() {
    this.findForm = this.fb.group({
      verse: ['', Validators.required],
      comment: [''],
      pageNumber: [1],
      pageSize: [20]

    });
  }

  onClick() {
    //console.log("Submit button was clicked!" + this.userParams.textData);
    localStorage.setItem("verseSearch", this.findForm.value.verse);
    localStorage.setItem("commentSearch", this.findForm.value.comment);
    //console.log(this.findForm.value)
    this.loadHadiths();
  }

  onSubmit() {
    //console.log("Form was submitted!");
  }

  loadHadith() {
    this.hadithsService.getTHadith(this.route.snapshot.paramMap.get('id')).subscribe(hadith => {
      this.hadith = hadith;
    })
  }

  loadHadiths() {
    this.hadithsService.getTHadiths(this.findForm.value).subscribe(response => {
      this.hadiths = response.result;
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
        localStorage.setItem("hadiths", JSON.stringify(this.hadiths));
      }
      this.selectedIndex = Number(this.hadiths[this.rowIndex].id)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/thadiths/' + this.selectedIndex]));
    });
  }
  
  updateHadith() {
    this.hadithsService.updateMember(this.hadith, this.route.snapshot.paramMap.get('id')).subscribe(() => {
      this.toastr.success('Data updated successfully');
      this.editForm.reset(this.hadith);
      this.loadHadith();
    })
  }

  cancel() {
    this.userParams = new UserParams();
    this.editForm.reset(this.hadith);
    localStorage.removeItem('hadiths');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('commentSearch');
    localStorage.removeItem('rowIndex');
    this.loadHadith();
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
        if (localStorage.getItem('hadiths') != null)
          this.hadiths = JSON.parse(localStorage.getItem("hadiths"));
        localStorage.setItem("rowIndex", this.rowIndex.toString());
        //console.log(this.tbibles[this.rowIndex].id);
        this.selectedIndex = this.hadiths[this.rowIndex].id;
      }
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/thadiths/' + this.selectedIndex]));
    });
 }

  previous() {
    this.route.paramMap.subscribe(params => {
      if (localStorage.getItem('verseSearch') == null && localStorage.getItem('commentSearch') == null) {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        --this.selectedIndex;
      } else {
          if (this.rowIndex >= 0) {
            --this.rowIndex;
            if (localStorage.getItem('hadiths') != null)
              this.hadiths = JSON.parse(localStorage.getItem("hadiths"));
            localStorage.setItem("rowIndex", this.rowIndex.toString());
            //console.log(this.tbibles[this.rowIndex].id);
            this.selectedIndex = this.hadiths[this.rowIndex].id;
          }
      }
      //console.log(id)
      if (this.selectedIndex >= 0) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/thadiths/' + this.selectedIndex]));
      }
    });
   }

  firsts() {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.selectedIndex = (Number(id));
      this.selectedIndex = 1;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/thadiths/' + this.selectedIndex]));
    });
   }

  resetFilters() {
    this.userParams = new UserParams();
    localStorage.removeItem('hadiths');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('commentSearch');
    localStorage.removeItem('rowIndex');
    this.firsts();
  }

  get verse() {
    return this.findForm.get('verse');
  }
  
  get comment() {
    return this.findForm.get('comment');
  }
}

interface fHadith{
  id:string;
  name:string;
}
