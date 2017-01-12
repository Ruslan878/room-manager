import { Component, OnInit } from '@angular/core';
import { Router }            from '@angular/router';

import { Subject }          from 'rxjs/Subject';

import { Room }             from './room';
import { RoomService }      from './room.service';

@Component({
  selector: 'rooms',
  templateUrl: './rooms.component.html',
  styleUrls: [ './rooms.component.css' ]
})

export class RoomsComponent implements OnInit{
  rooms: Room[];
  selectedRoom: Room;
  errorMessage: string;

  private searchRoomStream = new Subject<string>();
  
  constructor(private roomService: RoomService){
    this.searchRoomStream
          .debounceTime(500)
          .distinctUntilChanged()
          .switchMap((term: string) => this.roomService.search(term))
          .subscribe(
              rooms => this.rooms = rooms,
              error => this.errorMessage = <any>error);
  }

  getRooms(): void {
    this.roomService
      .getRooms()
      .subscribe(
        rooms => this.rooms = rooms,
        error => this.errorMessage = <any>error
      );
  }

  search(filter: string): void {
    this.searchRoomStream.next(filter);
  }

  add(name: string): void {
    if(name.length){
      this.roomService
        .create(name)
        .subscribe(
          rooms => this.rooms = rooms,
          error => this.errorMessage = <any>error
        );
    }
  }

  delete(room: Room): void {

  }

  onSelect(room: Room): void {
    this.selectedRoom = room;
  }

  ngOnInit(): void {
    this.getRooms();
  }
}
