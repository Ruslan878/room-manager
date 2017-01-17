import { Component, OnInit }      from '@angular/core';
import { ActivatedRoute, Router, Params }                 from '@angular/router';
import { Location }               from '@angular/common';

import { Room }             from '../rooms/room';
import { RoomService }      from '../rooms/room.service';

@Component({
  selector: 'room-details',
  templateUrl: './room-details.component.html',
  styleUrls: [ './room-details.component.css' ]
})

export class RoomDetailsComponent implements OnInit{
    room: Room;
    errorMessage: string;

    constructor(
        private roomService: RoomService,
        private activatedRoute: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.activatedRoute.params
        .switchMap((params: Params) => this.roomService.getRoom(+params['id']))
        .subscribe(room => this.room = room);
    }

    save(): void {
        this.roomService
            .update(this.room)
            .subscribe(
                () => this.goBack()
            );
    }

    delete(): void {
      this.roomService
        .delete(this.room.Id)
        .subscribe(
          () => this.router.navigate(['/rooms']),
          error => this.errorMessage = <any>error
        );
    }

    goBack(): void {
        this.location.back();
    }
}