import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-messages',
  templateUrl: './no-messages.component.html',
  styleUrls: ['./no-messages.component.css']
})
export class NoMessagesComponent implements OnInit {

  sideNav: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  openNav() {
    this.sideNav = !this.sideNav;
  }

}
