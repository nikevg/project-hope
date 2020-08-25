import { Injectable } from '@angular/core';
import {
  CanDeactivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

import { TemplateComponent } from './template.component';
import { DialogComponent } from '../../shared/dialog/dialog.component';

@Injectable()
export class CanDeactivateTemplateGuard
  implements CanDeactivate<TemplateComponent> {
  canDeactivate(
    component: TemplateComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!component.templateForm.dirty) {
      return true;
    }

    const dialogRef = component.dialog.open(DialogComponent, {
      data: {
        title: 'Leave page?',
        message: 'All unsaved changes will be lost.',
        cancelName: 'Cancel',
        okName: 'Leave',
      },
    });

    return dialogRef.afterClosed();
  }
}
