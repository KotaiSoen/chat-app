import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './PAGES/login/login.component';
import { MessagesComponent } from './PAGES/messages/messages.component';
import { NoMessagesComponent } from './PAGES/no-messages/no-messages.component';
import { ProfileComponent } from './PAGES/profile/profile.component';
import { RegisterComponent } from './PAGES/register/register.component';
import { AngularFireAuthGuard, canActivate, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  {path: 'messages/:id', component: MessagesComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'no-messages', component: NoMessagesComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent, ...canActivate(redirectUnauthorizedToLogin)},
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: '**', redirectTo: '/login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
