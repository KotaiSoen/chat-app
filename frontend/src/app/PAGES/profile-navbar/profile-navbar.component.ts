import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit {

  profileNavbar: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  profilePopup() {
    this.profileNavbar = !this.profileNavbar;
  }
}
