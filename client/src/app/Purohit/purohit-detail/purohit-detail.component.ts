import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { tswami_gita_scsv } from 'src/app/_models/tswami_gita_scsv';
import { UserParams } from 'src/app/_models/userParams';
import { TswamiGitaScsvService } from 'src/app/_services/tswami-gita-scsv.service';

@Component({
  selector: 'app-purohit-detail',
  templateUrl: './purohit-detail.component.html',
  styleUrls: ['./purohit-detail.component.css']
})
export class PurohitDetailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  tswami_gita_scsv: tswami_gita_scsv;
  tswami_gita_scsvs: tswami_gita_scsv[];
  findForm: FormGroup;
  isDisabled: boolean;
  isLastDisabled: boolean;
  selectedIndex: number;
  rowIndex: number;
  userParams: UserParams;
  pagination: Pagination;
  languageObjects : fPurohit[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  
  constructor(private tswamigitascsvService: TswamiGitaScsvService, private route: ActivatedRoute, private toastr: ToastrService, 
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
      if (localStorage.getItem('tswami_gita_scsvs') != null)
        this.tswami_gita_scsvs = JSON.parse(localStorage.getItem("tswami_gita_scsvs"));
      if (localStorage.getItem('rowIndex') != null)
        this.rowIndex = Number(localStorage.getItem('rowIndex'));
      this.languageObjects = [
          {id: "all", name: "All Fields"},
          {id: "Verse", name: "Verse"},
          {id: "Comment", name: "Comment"},
          {id: "chapter", name: "Chapter"},
          {id: "igs", name: "IGS"}
        ]
     }

  ngOnInit(): void {
    this.loadPurohit();
    this.tswamigitascsvService.getMax().subscribe((response) => {
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
    this.loadPurohits();
  }

  onSubmit() {
    //console.log("Form was submitted!");
  }

  loadPurohit() {
    this.tswamigitascsvService.getPurohit(this.route.snapshot.paramMap.get('id')).subscribe(tswami_gita_scsv => {
      this.tswami_gita_scsv = tswami_gita_scsv;
    })
  }

  loadPurohits() {
    this.tswamigitascsvService.getPurohits(this.findForm.value).subscribe(response => {
      this.tswami_gita_scsvs = response.result;
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
        localStorage.setItem("tswami_gita_scsvs", JSON.stringify(this.tswami_gita_scsvs));
      }
      this.selectedIndex = Number(this.tswami_gita_scsvs[this.rowIndex].id)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/purohit/' + this.selectedIndex]));
    });
  }

  updatePurohit() {
    //console.log(JSON.stringify(this.tswami_gita_scsv));
    this.tswamigitascsvService.updatePurohit(this.tswami_gita_scsv, this.route.snapshot.paramMap.get('id')).subscribe(() => {
      this.toastr.success('Data updated successfully');
      this.editForm.reset(this.tswami_gita_scsv);
      this.loadPurohit();
    })
  }

  cancel() {
    this.userParams = new UserParams();
    this.editForm.reset(this.tswami_gita_scsv);
    localStorage.removeItem('tswami_gita_scsvs');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('commentSearch');
    localStorage.removeItem('rowIndex');
    this.loadPurohit();
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
        if (localStorage.getItem('tswami_gita_scsvs') != null)
          this.tswami_gita_scsvs = JSON.parse(localStorage.getItem("tswami_gita_scsvs"));
        localStorage.setItem("rowIndex", this.rowIndex.toString());
        //console.log(this.tbibles[this.rowIndex].id);
        this.selectedIndex = this.tswami_gita_scsvs[this.rowIndex].id;
      }
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/purohit/' + this.selectedIndex]));
        this.tswamigitascsvService.getMax().subscribe((response) => {
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
      if (localStorage.getItem('verseSearch') == null && localStorage.getItem('commentSearch') == null) {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        --this.selectedIndex;
      } else {
          if (this.rowIndex >= 0) {
            --this.rowIndex;
            if (localStorage.getItem('tswami_gita_scsvs') != null)
              this.tswami_gita_scsvs = JSON.parse(localStorage.getItem("tswami_gita_scsvs"));
            localStorage.setItem("rowIndex", this.rowIndex.toString());
            //console.log(this.tbibles[this.rowIndex].id);
            this.selectedIndex = this.tswami_gita_scsvs[this.rowIndex].id;
          }
      }
      //console.log(id)
      if (this.selectedIndex >= 0) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/purohit/' + this.selectedIndex]));
      }
    });
   }

  firsts() {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.selectedIndex = (Number(id));
      this.selectedIndex = 1;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/purohit/' + this.selectedIndex]));
    });
   }

  resetFilters() {
    this.userParams = new UserParams();
    localStorage.removeItem('tswami_gita_scsvs');
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

interface fPurohit{
  id:string;
  name:string;
}
