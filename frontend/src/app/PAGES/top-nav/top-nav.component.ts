import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from 'src/app/SERVICES/chat.service';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.css']
})
export class TopNavComponent implements OnInit {

  innerWidth!: number;

  @HostListener('window:resize')
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  @Output() sideNavEvent = new EventEmitter<boolean>();

  chatName: string = '';

  constructor(private route: ActivatedRoute, private chatService: ChatService) { }

  ngOnInit(): void {
    this.innerWidth = window.innerWidth;
    this.route.params.subscribe((params) => {
      if(params) {
        this.chatService.oneChannel(params['id']).subscribe((group) => {
          this.chatName = group?.name!;
        })
      }
      
    })
  }

  openNav() {
    this.sideNavEvent.emit()
  }

}
