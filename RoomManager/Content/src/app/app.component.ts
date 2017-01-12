import { Component } from '@angular/core';

import '../../public/css/styles.css'

@Component({
  selector: 'room-manager-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  jwt: string;
  constructor(){
    this.jwt = localStorage.getItem('auth_token');
  }
}
