import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessagesComponent } from './PAGES/messages/messages.component';

const routes: Routes = [
  {path: 'messages', component: MessagesComponent},
  {path: '', redirectTo: '/messages', pathMatch: 'full'},
  {path: '**', redirectTo: '/messages', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
