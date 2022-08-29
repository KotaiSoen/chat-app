import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './PAGES/sidenav/sidenav.component';
import { ChannelsPipe } from './PIPES/channels.pipe';
import { MessagesComponent } from './PAGES/messages/messages.component';
import { ProfileNavbarComponent } from './PAGES/profile-navbar/profile-navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ChannelsPipe,
    MessagesComponent,
    ProfileNavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
