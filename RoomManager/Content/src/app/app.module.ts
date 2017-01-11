import './rxjs-extensions';

import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { AuthenticationService } from './authentication/authentication.service';
import { LoggedInGuard } from './logged-in.guard';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RoomsComponent } from './rooms/rooms.component';

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
    RoomsComponent
  ],
  bootstrap: [ AppComponent ],
  providers: [AuthenticationService, LoggedInGuard]
})

export class AppModule { }
