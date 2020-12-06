import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {UpdateAvatarComponent} from '../../../../modules/shared/Components/update-avatar/update-avatar.component';
import {ModalService} from '../../../modal.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateAvatarMenuGuard implements CanDeactivate<UpdateAvatarComponent> {

  constructor(
    private modalService: ModalService
  ) {
  }

  canDeactivate(component: UpdateAvatarComponent,
                currentRoute?: ActivatedRouteSnapshot,
                currentState?: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return component.selectFile ? confirm('Are you serious') : true;
  }
}
