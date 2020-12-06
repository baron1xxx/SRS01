import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AuthLocalService} from '../../../../services/auth-local.service';
import {User} from '../../../../models/User';
import {Host} from '../../../../enum/host.enum';
import {Router} from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userIsAuthenticated = false;
  private authListenerSub: Subscription = new Subscription();

  private principal: User;
  private avatarImagePath = `${Host.API_HOST}/images/user/`;
  closeDws = 'close_dws';

  constructor(
    private authLocalService: AuthLocalService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.authLocalService.principalUser();
    this.authListenerSub.add(
      this.authLocalService
        .getAuthStatusListener()
        .subscribe(isAuthenticated => {
          this.userIsAuthenticated = isAuthenticated;
          this.principal = this.authLocalService.getPrincipal();
        }));
    this.userIsAuthenticated = this.authLocalService.getIsAuthenticated();
  }

  logout(): void {
    this.closeDws = 'close_dws';
    this.authListenerSub.add(
      this.authLocalService.logout().subscribe((v) => {
          console.log(v);
        }));
  }

  ngOnDestroy(): void {
    this.authListenerSub.unsubscribe();
  }

  closeDwsList() {
    console.log('closeDws');
    this.closeDws = 'close_dws';
    this.router.navigate(['customers']);
  }

  openDwsList() {
    console.log('openDws');
    this.closeDws = 'open_dws';
  }
}
