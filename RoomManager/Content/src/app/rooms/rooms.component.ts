import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: [ './rooms.component.css' ]
})

export class RoomsComponent implements OnInit {
  constructor( private router: Router){}
  ngOnInit(): void {}
}
