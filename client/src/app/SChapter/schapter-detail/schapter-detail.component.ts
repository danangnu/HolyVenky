import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { Tsggs_chapter_pages } from 'src/app/_models/tsggs_chapter_pages';
import { UserParams } from 'src/app/_models/userParams';
import { TsggsChapterPagesService } from 'src/app/_services/tsggs-chapter-pages.service';

@Component({
  selector: 'app-schapter-detail',
  templateUrl: './schapter-detail.component.html',
  styleUrls: ['./schapter-detail.component.css']
})
export class SchapterDetailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  tsggs_chapter_pages: Tsggs_chapter_pages;
  tsggs_chapterpages: Tsggs_chapter_pages[];
  findForm: FormGroup;
  isDisabled: boolean;
  selectedIndex: number;
  rowIndex: number;
  userParams: UserParams;
  pagination: Pagination;
  languageObjects : fSChapter[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private tsggschapterpagesService: TsggsChapterPagesService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router, 
    private fb: FormBuilder) {
      this.userParams = new UserParams();
      this.selectedIndex = Number(this.route.snapshot.paramMap.get('id'));
      if (this.selectedIndex <= 1)
      {
        this.isDisabled = true;
      } else 
      {
        this.isDisabled = false;
      }
      if (localStorage.getItem('chapterSearch') != null)
        this.userParams.chapter = localStorage.getItem('chapterSearch');
      if (localStorage.getItem('commentSearch') != null)
        this.userParams.comment = localStorage.getItem('commentSearch');
      if (localStorage.getItem('tsggs_chapterpages') != null)
        this.tsggs_chapterpages = JSON.parse(localStorage.getItem("tsggs_chapterpages"));
      if (localStorage.getItem('rowIndex') != null)
        this.rowIndex = Number(localStorage.getItem('rowIndex'));
      this.languageObjects = [
          {id: "all", name: "All Fields"},
          {id: "chapter", name: "Chapter Ragas"},
          {id: "gurumkhi", name: "Gurumkhi"},
        ]
     }

  ngOnInit(): void {
    this.loadSChapter();
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
      chapter: ['', Validators.required],
      comment: [''],
      pageNumber: [1],
      pageSize: [20]

    });
  }

  onClick() {
    //console.log("Submit button was clicked!" + this.userParams.textData);
    localStorage.setItem("chapterSearch", this.findForm.value.chapter);
    localStorage.setItem("commentSearch", this.findForm.value.comment);
    //console.log(this.findForm.value)
    this.loadSChapters();
  }

  onSubmit() {
    //console.log("Form was submitted!");
  }

  loadSChapter() {
    this.tsggschapterpagesService.getSChapter(this.route.snapshot.paramMap.get('id')).subscribe(tsggs_chapter_pages => {
      this.tsggs_chapter_pages = tsggs_chapter_pages;
    })
  }

  loadSChapters() {
    this.tsggschapterpagesService.getSChapters(this.findForm.value).subscribe(response => {
      this.tsggs_chapterpages = response.result;
      this.pagination = response.pagination;

      if (localStorage.getItem('chapterSearch') == null) {
      } else {
        if (localStorage.getItem('rowIndex') != null) {
          this.rowIndex = Number(localStorage.getItem('rowIndex'));
          ++this.rowIndex;
        }
        else {
          this.rowIndex = 0;
          localStorage.setItem("rowIndex", this.rowIndex.toString());
        }
        localStorage.setItem("tsggs_chapterpages", JSON.stringify(this.tsggs_chapterpages));
      }
      this.selectedIndex = Number(this.tsggs_chapterpages[this.rowIndex].order_in_SGGS)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/schapter/' + this.selectedIndex]));
    });
  }

  updateSChapter() {
    this.tsggschapterpagesService.updateSChapter(this.tsggs_chapter_pages, this.route.snapshot.paramMap.get('id')).subscribe(() => {
      this.toastr.success('Data updated successfully');
      this.editForm.reset(this.tsggs_chapter_pages);
      this.router.navigate(['/schapter']);
    })
  }

  cancel() {
    this.editForm.reset(this.tsggs_chapter_pages);
    this.router.navigate(['/schapter']);
  }

  next() {
    this.route.paramMap.subscribe(params => {
      if (localStorage.getItem('chapterSearch') == null)
      {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        ++this.selectedIndex;
      } else 
      {
        ++this.rowIndex;
        if (localStorage.getItem('tsggs_chapterpages') != null)
          this.tsggs_chapterpages = JSON.parse(localStorage.getItem("tsggs_chapterpages"));
        localStorage.setItem("rowIndex", this.rowIndex.toString());
        //console.log(this.tbibles[this.rowIndex].id);
        this.selectedIndex = this.tsggs_chapterpages[this.rowIndex].order_in_SGGS;
      }
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/schapter/' + this.selectedIndex]));
    });
 }

  previous() {
    this.route.paramMap.subscribe(params => {
      if (localStorage.getItem('chapterSearch') == null && localStorage.getItem('commentSearch') == null) {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        --this.selectedIndex;
      } else {
          if (this.rowIndex >= 0) {
            --this.rowIndex;
            if (localStorage.getItem('tsggs_chapterpages') != null)
              this.tsggs_chapterpages = JSON.parse(localStorage.getItem("tsggs_chapterpages"));
            localStorage.setItem("rowIndex", this.rowIndex.toString());
            //console.log(this.tbibles[this.rowIndex].id);
            this.selectedIndex = this.tsggs_chapterpages[this.rowIndex].order_in_SGGS;
          }
      }
      //console.log(id)
      if (this.selectedIndex >= 0) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/schapter/' + this.selectedIndex]));
      }
    });
   }

  firsts() {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.selectedIndex = (Number(id));
      this.selectedIndex = 1;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/schapter/' + this.selectedIndex]));
    });
   }

  resetFilters() {
    this.userParams = new UserParams();
    localStorage.removeItem('tsggs_chapterpages');
    localStorage.removeItem('chapterSearch');
    localStorage.removeItem('commentSearch');
    localStorage.removeItem('rowIndex');
    this.firsts();
  }

  get chapter() {
    return this.findForm.get('chapter');
  }
  
  get comment() {
    return this.findForm.get('comment');
  }
}

interface fSChapter{
  id:string;
  name:string;
}
