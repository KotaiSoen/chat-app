import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  
  innerWidth!: number;
  sideNav: boolean = false;

  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
  }
  
  chatName = 'front-end developers';

  chats = [
    {
      name: 'Kotai',
      date: 'yesterday at 4pm',
      text: 'Hello bro, there\'s something that you should know about me. Tell me the truth about everything and you can go scott free. Don\'t lie to me. I will kill you if you do so'
    },
    {
      name: 'Kotai Soen',
      date: 'yesterday at 4pm',
      text: 'Hello bro, there\'s something that you should know about me. Tell me the truth about everything and you can go scott free. Don\'t lie to me'
    },
  ]

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  channelName(channelName: string) {
    this.chatName = channelName;
  }

  openNav() {
    this.sideNav = !this.sideNav;
  }

}
