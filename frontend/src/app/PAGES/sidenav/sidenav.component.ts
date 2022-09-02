import { Component, OnInit, Output, EventEmitter, HostListener, Input} from '@angular/core';
import { Group } from 'src/app/MODELS/group';
import { User } from 'src/app/MODELS/user';
import { AuthService } from 'src/app/SERVICES/auth.service';
import { ChatService } from 'src/app/SERVICES/chat.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  openNavbar: boolean = false;

  innerWidth!: number;

  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  @Input() sideNav: boolean = false;

  @Output() channelEvent = new EventEmitter<string>();

  @Output() sideNavEvent = new EventEmitter<boolean>();

  channel!: Group;

  openOneChannel = false;

  addChannel: boolean = false;

  channels!: Group[];

  constructor(private chatService: ChatService, private authService: AuthService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;

    this.chatService.groups.subscribe((data) => {
      this.channels = data;
    })
  }

  async channelId(channelId: string) {
     await this.authService.getCurrentUser().then(result => {
      const uid = result!.uid;
      this.chatService.addMemberToGroup(channelId, uid);
    })
    this.openOneChannel = true;

  }

  addNewChannel() {
    this.addChannel = !this.addChannel;
  }

  removeAddChannel(event: any) {
    if(event.target.className === "modal-div") {
      this.addChannel = false;
    }
  }

  allChannels() {
    this.openOneChannel = false;
  }

  closeNav() {
    this.sideNavEvent.emit();
  }

  createNewChannel(name: string, description: string) {
    const createdAt = new Date();
    const createdBy = 'Kotai'
    const group = {name, description, createdBy, createdAt};
    this.chatService.createChannel(group);
    this.addChannel = false;
  }

  

}
