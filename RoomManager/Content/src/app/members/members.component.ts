import { Component, EventEmitter, OnInit, OnChanges, SimpleChanges }      from '@angular/core';
import { ActivatedRoute }         from '@angular/router';

import { Member }         from './member';
import { Room }           from '../rooms/room';
import { MemberService }  from './member.service';
import { InlineEditComponent } from '../common/inline-edit/inline-edit.component';

@Component({
  selector: 'members',
  templateUrl: './members.component.html',
  styleUrls: [ './members.component.css' ],
  inputs: ['selectedRoom'],
  outputs: ['onRemoved', 'onCreated']
})

export class MembersComponent implements OnInit{
    selectedRoom: Room;
    members: Member[];
    errorMessage: string;
    onRemoved = new EventEmitter();
    onCreated = new EventEmitter();

    constructor(
      private memberService: MemberService,
      private activatedRoute: ActivatedRoute,
    ) {}

    ngOnChanges(changes: SimpleChanges): void {
      let newRoom = changes['selectedRoom'].currentValue;
      if(newRoom){
        this.getMembers();
      }
    }

    getMembers(): void {
      var roomId = this.selectedRoom ? this.selectedRoom.Id : undefined;
      this.memberService
        .getMembers(roomId)
        .subscribe(
          members => this.members = members,
          error => this.errorMessage = <any>error
        );
    }    

    add(name: string): void {
      if(name.length){
        this.memberService
          .create(name, this.selectedRoom.Id)
          .subscribe(
            () => {
              this.onCreated.emit();
              this.getMembers();
            },
            error => this.errorMessage = <any>error
          );
      }
    }

    delete(member: Member): void {
      this.memberService
        .delete(member.Id)
        .subscribe(
          () => {
            this.onRemoved.emit();
            this.getMembers();
          },
          error => this.errorMessage = <any>error
        );
    }

    onMemberNameEdit(newName: string, member: Member): void {
      if(newName != member.Name){
        member.Name = newName;
        this.memberService
          .update(member)
          .subscribe(
            () => {},
            error => this.errorMessage = <any>error
          );
      }
    }

    ngOnInit(): void {
      this.getMembers();
    }
}