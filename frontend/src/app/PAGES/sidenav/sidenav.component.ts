import { Component, OnInit, Output, EventEmitter, HostListener, Input} from '@angular/core';

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

  channel: string = '';

  addChannel: boolean = false;

  channels = ['alpha males', 'fast cars', 'bad bitches', 'girls', 'boys', 'alumini', 'engineers', 'full-stack developers', 'web designers', 'cloud engineers', 'front-end developers', 'back-end developers', 'redditors', 'bastards', 'broke fucks']

  constructor() { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
  }

  channelName(channel: string) {
    this.channel = channel;
    this.channelEvent.emit(channel);
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
    this.channel = '';
  }

  closeNav() {
    this.sideNavEvent.emit();
  }

}
