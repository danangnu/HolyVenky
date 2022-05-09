import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { tSGGS_Final } from 'src/app/_models/tsggs_final';
import { UserParams } from 'src/app/_models/userParams';
import { TsggsFinalService } from 'src/app/_services/tsggs-final.service';

@Component({
  selector: 'app-gurumukhi-detail',
  templateUrl: './gurumukhi-detail.component.html',
  styleUrls: ['./gurumukhi-detail.component.css'],
})
export class GurumukhiDetailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  tsggs_Final: tSGGS_Final;
  tsggs_Finals: tSGGS_Final[];
  findForm: FormGroup;
  isDisabled: boolean;
  pagination: Pagination;
  selectedIndex: number;
  rowIndex: number;
  userParams: UserParams;
  languageObjects: fTsggs[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm.dirty) {
      this.updateGurumukhi();
      $event.returnValue = true;
    }
  }

  constructor(
    private tsggsfinalService: TsggsFinalService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    private fb: FormBuilder,
    private http: HttpClient
  ) {
    this.userParams = new UserParams();
    this.selectedIndex = Number(this.route.snapshot.paramMap.get('id'));
    if (this.selectedIndex <= 1) {
      this.isDisabled = true;
    } else {
      this.isDisabled = false;
    }
    if (localStorage.getItem('verseSearch') != null)
      this.userParams.vERSE = localStorage.getItem('verseSearch');
    if (localStorage.getItem('commentSearch') != null)
      this.userParams.comment = localStorage.getItem('commentSearch');
    if (localStorage.getItem('tsggs_Finals') != null)
      this.tsggs_Finals = JSON.parse(localStorage.getItem('tsggs_Finals'));
    if (localStorage.getItem('rowIndex') != null)
      this.rowIndex = Number(localStorage.getItem('rowIndex'));
    this.languageObjects = [
      { id: 'all', name: 'All Fields' },
      { id: 'verse', name: 'Verse' },
      { id: 'comment', name: 'Comment' },
      { id: 'gurumukhi', name: 'Gurumukhi' },
      { id: 'trans', name: 'Trans' },
    ];
    this.userParams.bookTitle = 'all';
  }

  ngOnInit(): void {
    this.loadGurumukhi();
    console.log('test');
    this.modalForm();
    this.setDefaultValue();
  }

  setDefaultValue() {
    this.findForm.patchValue({
      comment: this.languageObjects[0].id,
    });
  }

  modalForm() {
    this.findForm = this.fb.group({
      vERSE: ['', Validators.required],
      comment: [''],
      pageNumber: [1],
      pageSize: [20],
    });
  }

  onClick() {
    //console.log("Submit button was clicked!" + this.userParams.textData);
    localStorage.setItem('verseSearch', this.findForm.value.vERSE);
    localStorage.setItem('commentSearch', this.findForm.value.comment);
    //console.log(this.findForm.value)
    this.loadGurumukhis();
  }

  onSubmit() {
    //console.log("Form was submitted!");
  }

  loadGurumukhis() {
    this.tsggsfinalService
      .getGurumukhi(this.findForm.value)
      .subscribe((response) => {
        this.tsggs_Finals = response.result;
        this.pagination = response.pagination;

        if (localStorage.getItem('verseSearch') == null) {
        } else {
          if (localStorage.getItem('rowIndex') != null) {
            this.rowIndex = Number(localStorage.getItem('rowIndex'));
            ++this.rowIndex;
          } else {
            this.rowIndex = 0;
            localStorage.setItem('rowIndex', this.rowIndex.toString());
          }
          localStorage.setItem(
            'tsggs_Finals',
            JSON.stringify(this.tsggs_Finals)
          );
        }
        this.selectedIndex = Number(this.tsggs_Finals[this.rowIndex].id);
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() =>
            this.router.navigate(['/gurumukhi/' + this.selectedIndex])
          );
      });
  }

  loadGurumukhi() {
    this.tsggsfinalService
      .getGurumukhi1(this.route.snapshot.paramMap.get('id'))
      .subscribe((tsggs_Final) => {
        this.tsggs_Final = tsggs_Final;
      });
  }

  updateGurumukhi() {
    this.tsggsfinalService
      .updateGurumukhi(this.tsggs_Final, this.route.snapshot.paramMap.get('id'))
      .subscribe(() => {
        this.toastr.success('Data updated successfully');
        this.editForm.reset(this.tsggs_Final);
        this.router.navigate([
          '/gurumukhi/' + this.route.snapshot.paramMap.get('id'),
        ]);
      });
  }

  cancel() {
    this.userParams = new UserParams();
    this.editForm.reset(this.tsggs_Final);
    localStorage.removeItem('tbibles');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('chapterSearch');
    localStorage.removeItem('rowIndex');
    this.loadGurumukhi();
  }

  next() {
    this.route.paramMap.subscribe((params) => {
      if (localStorage.getItem('verseSearch') == null) {
        var id = params.get('id');
        this.selectedIndex = Number(id);
        ++this.selectedIndex;
      } else {
        ++this.rowIndex;
        if (localStorage.getItem('tsggs_Finals') != null)
          this.tsggs_Finals = JSON.parse(localStorage.getItem('tsggs_Finals'));
        localStorage.setItem('rowIndex', this.rowIndex.toString());
        //console.log(this.tbibles[this.rowIndex].id);
        this.selectedIndex = this.tsggs_Finals[this.rowIndex].id;
      }
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/gurumukhi/' + this.selectedIndex]));
      this.tsggsfinalService.getMax().subscribe((response) => {
        if (this.selectedIndex == response) {
          this.isDisabled = true;
        } else {
          this.isDisabled = false;
        }
      });
    });
  }

  previous() {
    this.route.paramMap.subscribe((params) => {
      if (
        localStorage.getItem('verseSearch') == null &&
        localStorage.getItem('commentSearch') == null
      ) {
        var id = params.get('id');
        this.selectedIndex = Number(id);
        --this.selectedIndex;
      } else {
        if (this.rowIndex >= 0) {
          --this.rowIndex;
          if (localStorage.getItem('tsggs_Finals') != null)
            this.tsggs_Finals = JSON.parse(
              localStorage.getItem('tsggs_Finals')
            );
          localStorage.setItem('rowIndex', this.rowIndex.toString());
          //console.log(this.tbibles[this.rowIndex].id);
          this.selectedIndex = this.tsggs_Finals[this.rowIndex].id;
        }
      }
      //console.log(id)
      if (this.selectedIndex >= 0) {
        this.router
          .navigateByUrl('/', { skipLocationChange: true })
          .then(() =>
            this.router.navigate(['/gurumukhi/' + this.selectedIndex])
          );
      }
    });
  }

  firsts() {
    this.route.paramMap.subscribe((params) => {
      var id = params.get('id');
      this.selectedIndex = Number(id);
      this.selectedIndex = 1;
      this.router
        .navigateByUrl('/', { skipLocationChange: true })
        .then(() => this.router.navigate(['/gurumukhi/' + this.selectedIndex]));
    });
  }

  resetFilters() {
    this.userParams = new UserParams();
    localStorage.removeItem('tsggs_Finals');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('commentSearch');
    localStorage.removeItem('rowIndex');
    this.firsts();
  }

  get vERSE() {
    return this.findForm.get('vERSE');
  }

  get comment() {
    return this.findForm.get('comment');
  }
}

interface fTsggs {
  id: string;
  name: string;
}
