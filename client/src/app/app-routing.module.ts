import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BchapterDetailComponent } from './BChapter/bchapter-detail/bchapter-detail.component';
import { BchapterListComponent } from './BChapter/bchapter-list/bchapter-list.component';
import { ZtbibleChapterNamesComponent } from './BChapter/ztbible-chapter-names/ztbible-chapter-names.component';
import { BhaktivedantaDetailComponent } from './Bhaktivedanta/bhaktivedanta-detail/bhaktivedanta-detail.component';
import { BhaktivedantaListComponent } from './Bhaktivedanta/bhaktivedanta-list/bhaktivedanta-list.component';
import { ZtgitaFullComponent } from './Bhaktivedanta/ztgita-full/ztgita-full.component';
import { BiblesDetailComponent } from './Bibles/bibles-detail/bibles-detail.component';
import { BiblesListComponent } from './Bibles/bibles-list/bibles-list.component';
import { TbibleComponent } from './Bibles/tbible/tbible.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { GandhiDetailComponent } from './Gandhi/gandhi-detail/gandhi-detail.component';
import { GandhiListComponent } from './Gandhi/gandhi-list/gandhi-list.component';
import { TgandhisQuotesComponent } from './Gandhi/tgandhis-quotes/tgandhis-quotes.component';
import { GurumukhiDetailComponent } from './Gurumukhi/gurumukhi-detail/gurumukhi-detail.component';
import { GurumukhiListComponent } from './Gurumukhi/gurumukhi-list/gurumukhi-list.component';
import { SggsComponent } from './Gurumukhi/sggs/sggs.component';
import { TsggsFinalComponent } from './Gurumukhi/tsggs-final/tsggs-final.component';
import { HomeComponent } from './home/home.component';
import { MemberListComponent } from './members/member-list/member-list.component';
import { PurohitDetailComponent } from './Purohit/purohit-detail/purohit-detail.component';
import { PurohitListComponent } from './Purohit/purohit-list/purohit-list.component';
import { TswamiGitaScsvComponent } from './Purohit/tswami-gita-scsv/tswami-gita-scsv.component';
import { QuranDetailComponent } from './Quran/quran-detail/quran-detail.component';
import { QuranListComponent } from './Quran/quran-list/quran-list.component';
import { YtquranComponent } from './Quran/ytquran/ytquran.component';
import { RegisterComponent } from './register/register.component';
import { SchapterDetailComponent } from './SChapter/schapter-detail/schapter-detail.component';
import { SchapterListComponent } from './SChapter/schapter-list/schapter-list.component';
import { TsggsChapterPagesComponent } from './SChapter/tsggs-chapter-pages/tsggs-chapter-pages.component';
import { HadithsComponent } from './THadiths/hadiths/hadiths.component';
import { ThadithsDetailComponent } from './THadiths/thadiths-detail/thadiths-detail.component';
import { ThadithsListComponent } from './THadiths/thadiths-list/thadiths-list.component';
import { UserAccountComponent } from './user-account/user-account.component';
import { PreventUnsavedChangesAddGuard } from './_guards/prevent-unsaved-changes-add.guard';
import { PreventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'bibles', component: BiblesListComponent },
  {
    path: 'bibles/:id',
    component: BiblesDetailComponent,
    canDeactivate: [PreventUnsavedChangesGuard],
  },
  { path: 'biblesadd', component: TbibleComponent },
  { path: 'gurumukhi', component: GurumukhiListComponent },
  {
    path: 'gurumukhi/:id',
    component: SggsComponent,
    canDeactivate: [PreventUnsavedChangesGuard],
  },
  {
    path: 'gurumukhiadd',
    component: TsggsFinalComponent,
    canDeactivate: [PreventUnsavedChangesAddGuard],
  },
  { path: 'quran', component: QuranListComponent },
  {
    path: 'quran/:id',
    component: QuranDetailComponent,
    canDeactivate: [PreventUnsavedChangesGuard],
  },
  {
    path: 'quranadd',
    component: YtquranComponent,
    canDeactivate: [PreventUnsavedChangesAddGuard],
  },
  { path: 'purohit', component: PurohitListComponent },
  {
    path: 'purohit/:id',
    component: PurohitDetailComponent,
    canDeactivate: [PreventUnsavedChangesGuard],
  },
  {
    path: 'purohitadd',
    component: TswamiGitaScsvComponent,
    canDeactivate: [PreventUnsavedChangesAddGuard],
  },
  { path: 'bhaktivedanta', component: BhaktivedantaListComponent },
  {
    path: 'bhaktivedanta/:id',
    component: BhaktivedantaDetailComponent,
    canDeactivate: [PreventUnsavedChangesGuard],
  },
  {
    path: 'bhaktivedantaadd',
    component: ZtgitaFullComponent,
    canDeactivate: [PreventUnsavedChangesAddGuard],
  },
  { path: 'bchapter', component: BchapterListComponent },
  {
    path: 'bchapter/:id',
    component: BchapterDetailComponent,
    canDeactivate: [PreventUnsavedChangesGuard],
  },
  {
    path: 'bchapteradd',
    component: ZtbibleChapterNamesComponent,
    canDeactivate: [PreventUnsavedChangesAddGuard],
  },
  { path: 'schapter', component: SchapterListComponent },
  {
    path: 'schapter/:id',
    component: SchapterDetailComponent,
    canDeactivate: [PreventUnsavedChangesGuard],
  },
  {
    path: 'schapteradd',
    component: TsggsChapterPagesComponent,
    canDeactivate: [PreventUnsavedChangesAddGuard],
  },
  { path: 'thadiths', component: ThadithsListComponent },
  {
    path: 'thadiths/:id',
    component: ThadithsDetailComponent,
    canDeactivate: [PreventUnsavedChangesGuard],
  },
  {
    path: 'thadithsadd',
    component: HadithsComponent,
    canDeactivate: [PreventUnsavedChangesAddGuard],
  },
  { path: 'gandhi', component: GandhiListComponent },
  {
    path: 'gandhi/:id',
    component: GandhiDetailComponent,
    canDeactivate: [PreventUnsavedChangesGuard],
  },
  {
    path: 'gandhiadd',
    component: TgandhisQuotesComponent,
    canDeactivate: [PreventUnsavedChangesAddGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canDeactivate: [PreventUnsavedChangesAddGuard],
  },
  {
    path: 'user-account',
    component: UserAccountComponent,
  },
  {
    path: 'memberlist',
    component: MemberListComponent,
  },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: 'server-error', component: ServerErrorComponent },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
