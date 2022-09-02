import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/MODELS/user';
import { AuthService } from 'src/app/SERVICES/auth.service';
import { ChatService } from 'src/app/SERVICES/chat.service';

@Component({
  selector: 'app-profile-navbar',
  templateUrl: './profile-navbar.component.html',
  styleUrls: ['./profile-navbar.component.css']
})
export class ProfileNavbarComponent implements OnInit {

  profileNavbar: boolean = false;

  user!: User;

  constructor(private authService: AuthService, private chatService: ChatService) { }

  ngOnInit(): void {
    this.authService.getCurrentUser().then(result => {
      this.chatService.getUserData(result!.uid).subscribe(user => {
        this.user = user!;
      });
    })
  }

  profilePopup() {
    this.profileNavbar = !this.profileNavbar;
  }

  logout() {
    this.authService.logout();
  }
}
