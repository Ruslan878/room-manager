import { Component, OnInit, EventEmitter }      from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }               from '@angular/common';

import { Subject }          from 'rxjs/Subject';
import 'rxjs/add/operator/switchMap';

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
  
  constructor(
    private roomService: RoomService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  )
  {
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

  gotoDetails(room: Room): void {
    this.selectedRoom = room;
    this.router.navigate(['/details', this.selectedRoom.Id]);
  }

  onSelect(room: Room): void {
    this.selectedRoom = room;
    this.location.replaceState("/rooms/"+room.Id);
  }

  onRemovedMember(): void{
   this.getRooms();
  }

  onCreatedMember(): void {
    this.getRooms();
  }

  ngOnInit(): void {
    this.getRooms();
    let id = +this.activatedRoute.snapshot.params['id'];
    if(id){
      this.roomService
      .getRoom(id)
      .subscribe(
        room => this.selectedRoom = room,
        error => this.errorMessage = <any>error
      );
    }
  }
}
