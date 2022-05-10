import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Pagination } from 'src/app/_models/pagination';
import { UserParams } from 'src/app/_models/userParams';
import { Ztgita_Full } from 'src/app/_models/ztgita_full';
import { ZtgitaFullService } from 'src/app/_services/ztgita-full.service';

@Component({
  selector: 'app-bhaktivedanta-detail',
  templateUrl: './bhaktivedanta-detail.component.html',
  styleUrls: ['./bhaktivedanta-detail.component.css']
})
export class BhaktivedantaDetailComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  ztgita_full: Ztgita_Full;
  ztgita_fulls: Ztgita_Full[];
  findForm: FormGroup;
  isDisabled: boolean;
  selectedIndex: number;
  rowIndex: number;
  userParams: UserParams;
  pagination: Pagination;
  languageObjects : fBhakti[];

  @HostListener('window:beforeunload', ['$event']) unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private ztgitafullService: ZtgitaFullService, private route: ActivatedRoute, private toastr: ToastrService, 
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
      if (localStorage.getItem('ztgita_fulls') != null)
        this.ztgita_fulls = JSON.parse(localStorage.getItem("ztgita_fulls"));
      if (localStorage.getItem('rowIndex') != null)
        this.rowIndex = Number(localStorage.getItem('rowIndex'));
      this.languageObjects = [
          {id: "all", name: "All Fields"},
          {id: "verse", name: "Verse"},
          {id: "readers_Comments", name: "Readers Comments"}
        ]
     }

  ngOnInit(): void {
    this.loadBhaktivedanta();
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
    this.loadBhaktivedantas();
  }

  onSubmit() {
    //console.log("Form was submitted!");
  }

  loadBhaktivedanta() {
    this.ztgitafullService.getBhaktivedanta(this.route.snapshot.paramMap.get('id')).subscribe(ztgita_full => {
      this.ztgita_full = ztgita_full;
    })
  }

  loadBhaktivedantas() {
    this.ztgitafullService.getBhaktivedantas(this.findForm.value).subscribe(response => {
      this.ztgita_fulls = response.result;
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
        localStorage.setItem("ztgita_fulls", JSON.stringify(this.ztgita_fulls));
      }
      this.selectedIndex = Number(this.ztgita_fulls[this.rowIndex].id)
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/bhaktivedanta/' + this.selectedIndex]));
    });
  }

  updateBhaktivedanta() {
    this.ztgitafullService.updateBhaktivedanta(this.ztgita_full, this.route.snapshot.paramMap.get('id')).subscribe(() => {
      this.toastr.success('Data updated successfully');
      this.editForm.reset(this.ztgita_full);
      this.loadBhaktivedanta();
    })
  }

  cancel() {
    this.userParams = new UserParams();
    this.editForm.reset(this.ztgita_full);
    localStorage.removeItem('ztgita_fulls');
    localStorage.removeItem('verseSearch');
    localStorage.removeItem('commentSearch');
    localStorage.removeItem('rowIndex');
    this.loadBhaktivedanta();
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
        if (localStorage.getItem('ztgita_fulls') != null)
          this.ztgita_fulls = JSON.parse(localStorage.getItem("ztgita_fulls"));
        localStorage.setItem("rowIndex", this.rowIndex.toString());
        //console.log(this.tbibles[this.rowIndex].id);
        this.selectedIndex = this.ztgita_fulls[this.rowIndex].id;
      }
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/bhaktivedanta/' + this.selectedIndex]));
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
            if (localStorage.getItem('ztgita_fulls') != null)
              this.ztgita_fulls = JSON.parse(localStorage.getItem("ztgita_fulls"));
            localStorage.setItem("rowIndex", this.rowIndex.toString());
            //console.log(this.tbibles[this.rowIndex].id);
            this.selectedIndex = this.ztgita_fulls[this.rowIndex].id;
          }
      }
      //console.log(id)
      if (this.selectedIndex >= 0) {
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
        this.router.navigate(['/bhaktivedanta/' + this.selectedIndex]));
      }
    });
   }

  firsts() {
    this.route.paramMap.subscribe(params => {
      var id = params.get('id');
      this.selectedIndex = (Number(id));
      this.selectedIndex = 1;
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(()=>
          this.router.navigate(['/bhaktivedanta/' + this.selectedIndex]));
    });
   }

  resetFilters() {
    this.userParams = new UserParams();
    localStorage.removeItem('ztgita_fulls');
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

interface fBhakti{
  id:string;
  name:string;
}
