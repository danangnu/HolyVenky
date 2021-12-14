import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { HadithsComponent } from '../THadiths/hadiths/hadiths.component';
import { ThadithsDetailComponent } from '../THadiths/thadiths-detail/thadiths-detail.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  canDeactivate(component: ThadithsDetailComponent): boolean {
    if (component.editForm.dirty) {
      return confirm('The changed data will be saved automatically!');
    }
    return true;
  }
  
}
