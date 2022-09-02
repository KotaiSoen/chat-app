import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/MODELS/group';
import { User } from 'src/app/MODELS/user';
import { ChatService } from 'src/app/SERVICES/chat.service';

@Component({
  selector: 'app-sidenav-onegroup',
  templateUrl: './sidenav-onegroup.component.html',
  styleUrls: ['./sidenav-onegroup.component.css']
})
export class SidenavOnegroupComponent implements OnInit {
  @Output() allChannelsEvent = new EventEmitter<boolean>();

  channel!: Group;

  members: User[] = [];

  constructor(private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit(): void {
  
    this.route.params.subscribe((params) => {
      if(params) {
        this.chatService.oneChannel(params['id']).subscribe((channel) => {
          this.channel = channel!;
          console.log(this.channel);
          for(let i = 0; i < this.channel.members!.length; i++) {
            console.log(this.channel.members!.length);
            this.chatService.getUserData(this.channel.members![i]).subscribe(result => {
              // console.log(result);
              this.members.push(result!);
              // console.log(this.members);
            })
          }
        })
      }  
    })
  }

  allChannels() {
    this.allChannelsEvent.emit();
  }

}
