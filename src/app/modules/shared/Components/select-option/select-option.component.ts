import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-select-option',
  templateUrl: './select-option.component.html',
  styleUrls: ['./select-option.component.css']
})
export class SelectOptionComponent implements OnInit {

  dataOption = ['Kmdsd', 'Kyiv', 'Ryga'];

  constructor() {
  }

  ngOnInit() {
    // this.dataOption = ['Kmdsd', 'Kyiv', 'Ryga'];
  }

}
