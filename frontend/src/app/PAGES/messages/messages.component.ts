import { Component, HostListener, OnInit } from '@angular/core';
import { Group } from 'src/app/MODELS/group';
import { Message } from 'src/app/MODELS/message';
import { ChatService } from 'src/app/SERVICES/chat.service';

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

  chatName = '';

  channelId!: string;

  chats: Message[] = [];

  message: string = '';

  constructor(private chatService: ChatService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    if(localStorage.getItem('channelId') !== null) {
      this.channelId = localStorage.getItem('channelId')!;
      this.initializingPage(this.channelId);
    }
  }

  initializingPage(channelId: string) {
    this.chatService.oneChannel(channelId).subscribe((group) => {
      this.chatName = group!.name;
    })

    this.chatService.getGroupMessages(channelId).subscribe((messages) => {
      this.chats = messages;
    })
  }

  channelName(channelId: string) {
    localStorage.setItem('channelId', channelId);
    this.channelId = channelId;
    this.initializingPage(this.channelId);
  }

  openNav() {
    this.sideNav = !this.sideNav;
  }

  sendMessage() {
    const sentAt = new Date();
    const sentBy = 'Kotai';
    const text = this.message;
    const messageDetails = {sentAt, sentBy, text};
    this.chatService.sendMessage(this.channelId, messageDetails);
    this.message = '';
  }

}
