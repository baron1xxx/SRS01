import {Component, OnInit} from '@angular/core';
import {AuthLocalService} from './services/auth-local.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SRS01';
  
  constructor(
    private authLocalService: AuthLocalService,
  ) {
  }

  ngOnInit(): void {
    if (this.authLocalService.getIsAuthenticated()) {
      this.authLocalService.principalUser().subscribe();
    }
  }

}

