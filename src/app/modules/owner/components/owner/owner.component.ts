import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthLocalService} from '../../../../services/auth-local.service';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-owner',
  templateUrl: './owner.component.html',
  styleUrls: ['./owner.component.css']
})
export class OwnerComponent implements OnInit, OnDestroy {

  private unsubscribe$: Subject<void> = new Subject<void>();
  private nawTitle: string;

  constructor(
    private authLocalService: AuthLocalService,
    private router: Router
  ) { }

  ngOnInit() {
   this.nawTitle =  `I ${this.authLocalService.getPrincipal().role}`;
  }

  logout() {
    this.authLocalService.logout()
      .pipe(
        takeUntil(this.unsubscribe$)
      )
      .subscribe((data) => {
        console.log(data);
        this.router.navigate(['auth', 'login']);
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
