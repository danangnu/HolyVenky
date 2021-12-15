import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavComponent } from './nav/nav.component';
import { TbibleComponent } from './Bibles/tbible/tbible.component';
import { TsggsFinalComponent } from './Gurumukhi/tsggs-final/tsggs-final.component';
import { YtquranComponent } from './Quran/ytquran/ytquran.component';
import { TswamiGitaScsvComponent } from './Purohit/tswami-gita-scsv/tswami-gita-scsv.component';
import { ZtgitaFullComponent } from './Bhaktivedanta/ztgita-full/ztgita-full.component';
import { TsggsChapterPagesComponent } from './SChapter/tsggs-chapter-pages/tsggs-chapter-pages.component';
import { ZtbibleChapterNamesComponent } from './BChapter/ztbible-chapter-names/ztbible-chapter-names.component';
import { HadithsComponent } from './THadiths/hadiths/hadiths.component';
import { TgandhisQuotesComponent } from './Gandhi/tgandhis-quotes/tgandhis-quotes.component';
import { BiblesListComponent } from './Bibles/bibles-list/bibles-list.component';
import { BiblesDetailComponent } from './Bibles/bibles-detail/bibles-detail.component';
import { HomeComponent } from './home/home.component';
import { GurumukhiListComponent } from './Gurumukhi/gurumukhi-list/gurumukhi-list.component';
import { GurumukhiDetailComponent } from './Gurumukhi/gurumukhi-detail/gurumukhi-detail.component';
import { QuranListComponent } from './Quran/quran-list/quran-list.component';
import { QuranDetailComponent } from './Quran/quran-detail/quran-detail.component';
import { PurohitListComponent } from './Purohit/purohit-list/purohit-list.component';
import { PurohitDetailComponent } from './Purohit/purohit-detail/purohit-detail.component';
import { BhaktivedantaListComponent } from './Bhaktivedanta/bhaktivedanta-list/bhaktivedanta-list.component';
import { BhaktivedantaDetailComponent } from './Bhaktivedanta/bhaktivedanta-detail/bhaktivedanta-detail.component';
import { BchapterListComponent } from './BChapter/bchapter-list/bchapter-list.component';
import { BchapterDetailComponent } from './BChapter/bchapter-detail/bchapter-detail.component';
import { SchapterListComponent } from './SChapter/schapter-list/schapter-list.component';
import { SchapterDetailComponent } from './SChapter/schapter-detail/schapter-detail.component';
import { ThadithsListComponent } from './THadiths/thadiths-list/thadiths-list.component';
import { ThadithsDetailComponent } from './THadiths/thadiths-detail/thadiths-detail.component';
import { GandhiListComponent } from './Gandhi/gandhi-list/gandhi-list.component';
import { GandhiDetailComponent } from './Gandhi/gandhi-detail/gandhi-detail.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { ErrorInterceptor } from './_interceptors/error.interceptor';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { DialogBoxComponent } from './dialog-box/dialog-box.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LoadingInterceptor } from './_interceptors/loading.interceptor';
import { TextInputComponent } from './_forms/text-input/text-input.component';
import { TextTextareaComponent } from './_forms/text-textarea/text-textarea.component';
import { SggsComponent } from './Gurumukhi/sggs/sggs.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    TbibleComponent,
    TsggsFinalComponent,
    YtquranComponent,
    TswamiGitaScsvComponent,
    ZtgitaFullComponent,
    TsggsChapterPagesComponent,
    ZtbibleChapterNamesComponent,
    HadithsComponent,
    TgandhisQuotesComponent,
    BiblesListComponent,
    BiblesDetailComponent,
    HomeComponent,
    GurumukhiListComponent,
    GurumukhiDetailComponent,
    QuranListComponent,
    QuranDetailComponent,
    PurohitListComponent,
    PurohitDetailComponent,
    BhaktivedantaListComponent,
    BhaktivedantaDetailComponent,
    BchapterListComponent,
    BchapterDetailComponent,
    SchapterListComponent,
    SchapterDetailComponent,
    ThadithsListComponent,
    ThadithsDetailComponent,
    GandhiListComponent,
    GandhiDetailComponent,
    TestErrorsComponent,
    NotFoundComponent,
    ServerErrorComponent,
    DialogBoxComponent,
    TextInputComponent,
    TextTextareaComponent,
    SggsComponent
  ],
  imports: [
    BrowserModule,
    MDBBootstrapModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2SmartTableModule,
    MatTableModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    BsDropdownModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right'
    })
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
