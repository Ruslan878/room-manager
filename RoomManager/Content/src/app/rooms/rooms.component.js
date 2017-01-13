"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var Subject_1 = require("rxjs/Subject");
var room_service_1 = require("./room.service");
var RoomsComponent = (function () {
    function RoomsComponent(roomService) {
        var _this = this;
        this.roomService = roomService;
        this.searchRoomStream = new Subject_1.Subject();
        this.searchRoomStream
            .debounceTime(1000)
            .distinctUntilChanged()
            .switchMap(function (term) { return _this.roomService.search(term); })
            .subscribe(function (rooms) { return _this.rooms = rooms; }, function (error) { return _this.errorMessage = error; });
    }
    RoomsComponent.prototype.getRooms = function () {
        var _this = this;
        this.roomService.getRooms().subscribe(function (rooms) { return _this.rooms = rooms; }, function (error) { return _this.errorMessage = error; });
    };
    RoomsComponent.prototype.search = function (filter) {
        this.searchRoomStream.next(filter);
    };
    RoomsComponent.prototype.add = function (name) {
    };
    RoomsComponent.prototype.delete = function (room) {
    };
    RoomsComponent.prototype.onSelect = function (room) {
        this.selectedRoom = room;
    };
    RoomsComponent.prototype.ngOnInit = function () {
        this.getRooms();
    };
    return RoomsComponent;
}());
RoomsComponent = __decorate([
    core_1.Component({
        selector: 'rooms',
        templateUrl: './rooms.component.html',
        styleUrls: ['./rooms.component.css']
    }),
    __metadata("design:paramtypes", [room_service_1.RoomService])
], RoomsComponent);
exports.RoomsComponent = RoomsComponent;
//# sourceMappingURL=rooms.component.js.map