import { Component, OnInit } from '@angular/core';
import {AuthLocalService} from '../../../../services/auth-local.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(
    private authLocalService: AuthLocalService,
  ) { }

  ngOnInit() {
  }

}
