import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ChatService } from 'src/app/SERVICES/chat.service';
import { AuthService } from 'src/app/SERVICES/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private location: Location, private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(): void {
  }

  goBack() {
    this.location.back();
  }

  changeUsername(username: string) {
    this.authService.getCurrentUser().then((result) => {
      this.chatService.changeUserUsername(result!.uid, username);
      this.location.back();
    })
  }

  changeUserPhoto(event: any) {
    this.authService.getCurrentUser().then((result) => {
      this.chatService.changeUserProfilePicture(event, result!.uid);
    })
  }

}
