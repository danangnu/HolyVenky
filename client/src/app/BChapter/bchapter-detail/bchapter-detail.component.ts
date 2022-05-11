import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { zTbible_Chapter_Names } from 'src/app/_models/ztbible_chapter_names';
import { ZTbibleChapterNamesService } from 'src/app/_services/z-tbible-chapter-names.service';

@Component({
  selector: 'app-bchapter-detail',
  templateUrl: './bchapter-detail.component.html',
  styleUrls: ['./bchapter-detail.component.css']
})
export class BchapterDetailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  ztbible_chapter_names: zTbible_Chapter_Names;
  ztbible_chapternames: zTbible_Chapter_Names[];
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

  constructor(private ztbiblechapternamesService: ZTbibleChapterNamesService, private route: ActivatedRoute, private toastr: ToastrService, 
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
      if (localStorage.getItem('field2Search') != null)
        this.userParams.field2 = localStorage.getItem('field2Search');
      if (localStorage.getItem('ztbible_chapternames') != null)
        this.ztbible_chapternames = JSON.parse(localStorage.getItem("ztbible_chapternames"));
      if (localStorage.getItem('rowIndex') != null)
        this.rowIndex = Number(localStorage.getItem('rowIndex'));
     }

  ngOnInit(): void {
    this.loadBChapter();
    this.ztbiblechapternamesService.getMax().subscribe((response) => {
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
      field2: ['', Validators.required],
      pageNumber: [1],
      pageSize: [20]

    });
  }

  onClick() {
    //console.log("Submit button was clicked!" + this.userParams.textData);
    localStorage.setItem("field2Search", this.findForm.value.field2);
    //console.log(this.findForm.value)
    this.loadBChapters();
  }

  onSubmit() {
    //console.log("Form was submitted!");
  }

  loadBChapter() {
    this.ztbiblechapternamesService.getBChapter(this.route.snapshot.paramMap.get('id')).subscribe(ztbible_chapter_names => {
      this.ztbible_chapter_names = ztbible_chapter_names;
    })
  }

  loadBChapters() {
    this.ztbiblechapternamesService.getBChapters(this.findForm.value).subscribe(response => {
      this.ztbible_chapternames = response.result;
      this.pagination = response.pagination;

      if (localStorage.getItem('field2Search') == null) {
      } else {
        if (localStorage.getItem('rowIndex') != null) {
          this.rowIndex = Number(localStorage.getItem('rowIndex'));
          ++this.rowIndex;
        }
        else {
          this.rowIndex = 0;
          localStorage.setItem("rowIndex", this.rowIndex.toString());
        }
        localStorage.setItem("ztbible_chapternames", JSON.stringify(this.ztbible_chapternames));
      }
      this.selectedIndex = Number(this.ztbible_chapternames[this.rowIndex].id)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/bchapter/' + this.selectedIndex]));
    });
  }

  updateBChapter() {
    this.ztbiblechapternamesService.updateBChapter(this.ztbible_chapter_names, this.route.snapshot.paramMap.get('id')).subscribe(() => {
      this.toastr.success('Data updated successfully');
      this.editForm.reset(this.ztbible_chapter_names);
      this.loadBChapter();
    })
  }

  cancel() {
    this.userParams = new UserParams();
    this.editForm.reset(this.ztbible_chapter_names);
    localStorage.removeItem('ztbible_chapternames');
    localStorage.removeItem('field2Search');
    localStorage.removeItem('rowIndex');
    this.loadBChapter();
  }

  next() {
    this.route.paramMap.subscribe(params => {
      if (localStorage.getItem('field2Search') == null)
      {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        ++this.selectedIndex;
      } else 
      {
        ++this.rowIndex;
        if (localStorage.getItem('ztbible_chapternames') != null)
          this.ztbible_chapternames = JSON.parse(localStorage.getItem("ztbible_chapternames"));
        localStorage.setItem("rowIndex", this.rowIndex.toString());
        //console.log(this.tbibles[this.rowIndex].id);
        this.selectedIndex = this.ztbible_chapternames[this.rowIndex].id;
      }
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/bchapter/' + this.selectedIndex]));
        this.ztbiblechapternamesService.getMax().subscribe((response) => {
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
      if (localStorage.getItem('field2Search') == null) {
        var id = params.get('id');
        this.selectedIndex = (Number(id));
        --this.selectedIndex;
      } else {
          if (this.rowIndex >= 0) {
            --this.rowIndex;
            if (localStorage.getItem('ztbible_chapternames') != null)
              this.ztbible_chapternames = JSON.parse(localStorage.getItem("ztbible_chapternames"));
            localStorage.setItem("rowIndex", this.rowIndex.toString());
            //console.log(this.tbibles[this.rowIndex].id);
            this.selectedIndex = this.ztbible_chapternames[this.rowIndex].id;
          }
      }
      //console.log(id)
      if (this.selectedIndex >= 0) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/bchapter/' + this.selectedIndex]));
      }
    });
   }

  firsts() {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.selectedIndex = (Number(id));
      this.selectedIndex = 1;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/bchapter/' + this.selectedIndex]));
    });
   }

  resetFilters() {
    this.userParams = new UserParams();
    localStorage.removeItem('ztbible_chapternames');
    localStorage.removeItem('field2Search');
    localStorage.removeItem('rowIndex');
    this.firsts();
  }

  get field2() {
    return this.findForm.get('field2');
  }
}
