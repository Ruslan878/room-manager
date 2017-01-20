import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AuthenticationService } from './authentication/authentication.service';
import { LoggedInGuard } from './authentication/logged-in.guard';
import { RoomsComponent } from './rooms/rooms.component';
import { MembersComponent } from './members/members.component';
import { RoomDetailsComponent } from './room-details/room-details.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'rooms/:id', component: RoomsComponent, canActivate: [LoggedInGuard] },
  { path: 'rooms', component: RoomsComponent, canActivate: [LoggedInGuard] },
  { path: 'details/:id', component: RoomDetailsComponent, canActivate: [LoggedInGuard] }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes, {useHash: true}) ],
  exports: [ RouterModule ],
  providers: [AuthenticationService, LoggedInGuard]
})

export class AppRoutingModule {}
