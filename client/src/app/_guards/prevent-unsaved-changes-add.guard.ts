import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TbibleComponent } from '../Bibles/tbible/tbible.component';
import { HadithsComponent } from '../THadiths/hadiths/hadiths.component';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesAddGuard implements CanDeactivate<unknown> {
  canDeactivate(component: TbibleComponent): boolean {
    if (component.AddnewForm.dirty) {
      return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
    }
    return true;
  }
  
}
