import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
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

  subscription!: Subscription;

  constructor(private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit(): void {

    this.route.params.subscribe((params) => {
      if (params) {
        this.subscription = this.chatService.oneChannel(params['id']).subscribe((channel) => {
          this.channel = channel!;
          const membersArray: User[] = [];
          for (let i = 0; i < this.channel?.members!.length; i++) {
            this.chatService.getUserData(this.channel?.members![i]).pipe(take(1)).subscribe(result => {
              membersArray.push(result!);
            })
          }
          this.members = membersArray;
        })
      }
    })
  }

  allChannels() {
    this.allChannelsEvent.emit();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
