import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AuthenticationService } from './authentication/authentication.service';
import { LoggedInGuard } from './authentication/logged-in.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoomService } from './rooms/room.service';
import { RoomsComponent } from './rooms/rooms.component';
import { MembersComponent } from './members/members.component';
import { RoomDetailsComponent } from './room-details/room-details.component';
import { MemberService } from './members/member.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    AppRoutingModule
  ],
  declarations: [
    AppComponent,
    LoginComponent,
    RoomsComponent,
    MembersComponent,
    RoomDetailsComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [AuthenticationService, LoggedInGuard, RoomService, MemberService]
})

export class AppModule { }
