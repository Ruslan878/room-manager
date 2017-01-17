import { Component, OnInit, Input }      from '@angular/core';

import { Member }       from './member';
import { Room }         from '../rooms/room';

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: [ './members.component.css' ]
})

export class MembersComponent implements OnInit{
    @Input() selectedRoom: Room;
    members: Member[];

    ngOnInit(): void {
      debugger
      if(!this.selectedRoom){
        this.members = 
      }  
    }
}