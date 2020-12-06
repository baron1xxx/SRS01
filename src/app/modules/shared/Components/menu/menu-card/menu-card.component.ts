import {Component, Input, OnInit} from '@angular/core';
import {Host} from '../../../../../enum/host.enum';
import {Menu} from '../../../../../models/Menu';
import {AuthLocalService} from '../../../../../services/auth-local.service';

@Component({
  selector: 'app-menu-card',
  templateUrl: './menu-card.component.html',
  styleUrls: ['./menu-card.component.css']
})
export class MenuCardComponent implements OnInit {

  @Input() menu: Menu;
  avatarHost = `${Host.API_HOST}/images/restaurants`;

  constructor(
    private authLocalService: AuthLocalService,
  ) { }

  ngOnInit() {
    console.log(this.menu);
  }

}
