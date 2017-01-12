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
import { HomeComponent } from './home/home.component';
import { RoomService } from './home/rooms/room.service';
import { RoomsComponent } from './home/rooms/rooms.component';

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
    HomeComponent,
    RoomsComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [AuthenticationService, LoggedInGuard, RoomService]
})

export class AppModule { }
