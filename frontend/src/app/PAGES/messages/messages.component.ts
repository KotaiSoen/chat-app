import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/MODELS/group';
import { Message } from 'src/app/MODELS/message';
import { User } from 'src/app/MODELS/user';
import { AuthService } from 'src/app/SERVICES/auth.service';
import { ChatService } from 'src/app/SERVICES/chat.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  innerWidth!: number;

  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  sideNav: boolean = false;

  chatName = '';

  channelId!: string;

  chats: Message[] = [];

  message: string = '';

  user!: User;

  constructor(private chatService: ChatService, private route: ActivatedRoute, private authService: AuthService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    this.route.params.subscribe((params) => {
      if (params) {
        this.channelId = params['id'];
        this.initializingPage(this.channelId);
      }
    })
  }

  openNav() {
    this.sideNav = !this.sideNav;
  }

  initializingPage(channelId: string) {
    this.chatService.oneChannel(channelId).subscribe((group) => {
      this.chatName = group!.name;
    })

    this.chatService.getGroupMessages(channelId).subscribe((messages) => {
      this.chats = messages;

    })

    this.authService.getCurrentUser().then((user: any) => {
      this.chatService.getUserData(user.uid).subscribe((user) => {
        this.user = user!;
      })
    })
  }

  sendMessage() {
    if (this.message != '') {
      const sentAt = new Date();
      const sentBy = this.user.name;
      const text = this.message;
      const imageUrl = this.user.imageUrl!;
      const messageDetails = { sentAt, sentBy, text, imageUrl };
      this.chatService.sendMessage(this.channelId, messageDetails);
      this.message = '';
    }
  }

}
