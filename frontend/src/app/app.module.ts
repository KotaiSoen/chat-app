import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidenavComponent } from './PAGES/sidenav/sidenav.component';
import { ChannelsPipe } from './PIPES/channels.pipe';
import { MessagesComponent } from './PAGES/messages/messages.component';
import { ProfileNavbarComponent } from './PAGES/profile-navbar/profile-navbar.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { RegisterComponent } from './PAGES/register/register.component';
import { LoginComponent } from './PAGES/login/login.component';
import { SidenavOnegroupComponent } from './PAGES/sidenav-onegroup/sidenav-onegroup.component';
import { NoMessagesComponent } from './PAGES/no-messages/no-messages.component';
import { TopNavComponent } from './PAGES/top-nav/top-nav.component';
import { ProfileComponent } from './PAGES/profile/profile.component';


@NgModule({
  declarations: [
    AppComponent,
    SidenavComponent,
    ChannelsPipe,
    MessagesComponent,
    ProfileNavbarComponent,
    RegisterComponent,
    LoginComponent,
    SidenavOnegroupComponent,
    NoMessagesComponent,
    TopNavComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatButtonModule,
    MatAutocompleteModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
