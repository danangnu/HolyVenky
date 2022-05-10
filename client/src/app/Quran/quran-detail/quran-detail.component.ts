import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { ytquran } from 'src/app/_models/ytquran';
import { YtquranService } from 'src/app/_services/ytquran.service';

@Component({
  selector: 'app-quran-detail',
  templateUrl: './quran-detail.component.html',
  styleUrls: ['./quran-detail.component.css']
})
export class QuranDetailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  ytquran: ytquran;
  ytqurans: ytquran[];
  findForm: FormGroup;
  isDisabled: boolean;
  isLastDisabled: boolean;
  selectedIndex: number;
  rowIndex: number;
  userParams: UserParams;
  pagination: Pagination;
  languageObjects : fQuran[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private ytquranService: YtquranService, private route: ActivatedRoute, private toastr: ToastrService, 
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
      if (localStorage.getItem('suraSearch') != null)
        this.userParams.sura = localStorage.getItem('suraSearch');
      if (localStorage.getItem('ytqurans') != null)
        this.ytqurans = JSON.parse(localStorage.getItem("ytqurans"));
      if (localStorage.getItem('rowIndex') != null)
        this.rowIndex = Number(localStorage.getItem('rowIndex'));
      this.languageObjects = [
          {id: "all", name: "All Fields"},
          {id: "verse", name: "Verse"},
          {id: "sura", name: "Sura"},
          {id: "location", name: "Location"},
          {id: "commentary", name: "Commentary"}
        ]
        this.userParams.verse ="all";
     }

  ngOnInit(): void {
    this.loadQuran();
    this.ytquranService.getMax().subscribe((response) => {
      if (this.selectedIndex == response) {
        this.isLastDisabled = true;
      } else {
        this.isLastDisabled = false;
      }
    });
    this.modalForm();
    this.setDefaultValue();
  }

  setDefaultValue(){
    this.findForm.patchValue({
      sura : this.languageObjects[0].id
    })
  }

  modalForm() {
    this.findForm = this.fb.group({
      verse: ['', Validators.required],
      sura: [''],
      pageNumber: [1],
      pageSize: [20]

    });
  }

  onClick() {
    //console.log("Submit button was clicked!" + this.userParams.textData);
    localStorage.setItem("verseSearch", this.findForm.value.verse);
    localStorage.setItem("suraSearch", this.findForm.value.sura);
    //console.log(this.findForm.value)
    this.loadQurans();
  }

  onSubmit() {
    //console.log("Form was submitted!");
  }

  loadQuran() {
    this.ytquranService.getQuran(this.route.snapshot.paramMap.get('id')).subscribe(ytquran => {
      this.ytquran = ytquran;
    })
  }

  loadQurans() {
    this.ytquranService.getQurans(this.findForm.value).subscribe(response => {
      this.ytqurans = response.result;
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
        localStorage.setItem("ytqurans", JSON.stringify(this.ytqurans));
      }
      this.selectedIndex = Number(this.ytqurans[this.rowIndex].id)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/quran/' + this.selectedIndex]));
    });
  }

  updateQuran() {
    //console.log(JSON.stringify(this.ytquran));
    this.ytquranService.updateQuran(this.ytquran, this.route.snapshot.paramMap.get('id')).subscribe(() => {
      this.toastr.success('Data updated successfully');
      this.editForm.reset(this.ytquran);
      this.loadQuran();
    })
  }

  cancel() {
    this.userParams = new UserParams();
    this.editForm.reset(this.ytquran);
    localStorage.removeItem('ytqurans');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('suraSearch');
    localStorage.removeItem('rowIndex');
    this.loadQuran();
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
        if (localStorage.getItem('ytqurans') != null)
          this.ytqurans = JSON.parse(localStorage.getItem("ytqurans"));
        localStorage.setItem("rowIndex", this.rowIndex.toString());
        //console.log(this.tbibles[this.rowIndex].id);
        this.selectedIndex = this.ytqurans[this.rowIndex].id;
      }
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/quran/' + this.selectedIndex]));
        this.ytquranService.getMax().subscribe((response) => {
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
      if (localStorage.getItem('verseSearch') == null && localStorage.getItem('suraSearch') == null) {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        --this.selectedIndex;
      } else {
          if (this.rowIndex >= 0) {
            --this.rowIndex;
            if (localStorage.getItem('ytqurans') != null)
              this.ytqurans = JSON.parse(localStorage.getItem("ytqurans"));
            localStorage.setItem("rowIndex", this.rowIndex.toString());
            //console.log(this.tbibles[this.rowIndex].id);
            this.selectedIndex = this.ytqurans[this.rowIndex].id;
          }
      }
      //console.log(id)
      if (this.selectedIndex >= 0) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/quran/' + this.selectedIndex]));
      }
    });
   }

  firsts() {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.selectedIndex = (Number(id));
      this.selectedIndex = 1;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/quran/' + this.selectedIndex]));
    });
   }

  resetFilters() {
    this.userParams = new UserParams();
    localStorage.removeItem('ytqurans');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('suraSearch');
    localStorage.removeItem('rowIndex');
    this.firsts();
  }

  get verse() {
    return this.findForm.get('verse');
  }
  
  get sura() {
    return this.findForm.get('sura');
  }
}

interface fQuran{
  id:string;
  name:string;
}
