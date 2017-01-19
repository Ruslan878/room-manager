using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using RoomManager.Models;
using RoomManager.Extensions;

namespace RoomManager.Helpers
{
    //This class emulate work with DB
    public static class MockDataBase
    {
        private static List<RoomModel> rooms = new List<RoomModel> {
            new RoomModel { Id = 1, Name = "Room 101", Description = "Small room", },
            new RoomModel { Id = 2, Name = "Room 203", Description = "Large room"},
            new RoomModel { Id = 3, Name = "Room 406", Description = "Meeting room"},
            new RoomModel { Id = 4, Name = "Rest room 6 floor", Description = "Large room"},
            new RoomModel { Id = 5, Name = "Room 1009", Description = "Large Rest room"}
        };

        private static List<MemberModel> members = new List<MemberModel>
        {
            new MemberModel { Id = 1, Name = "Andrey Andreev", Order = 1 },
            new MemberModel { Id = 2, Name = "Petr Petrov", Order = 1 },
            new MemberModel { Id = 3, Name = "Olga Tsvetova", Order = 1 },
            new MemberModel { Id = 4, Name = "Ali Aliev", Order = 1 },
            new MemberModel { Id = 5, Name = "Tomas Tykver", Order = 1 }
        };

        public static void InitializeData()
        {
            AggregationData();
            HttpContext.Current.Application["Rooms"] = rooms.OrderBy(x => x.Name).ToList();
            HttpContext.Current.Application["Members"] = members.OrderBy(x => x.Name).ToList();
        }

        private static void AggregationData()
        {
            rooms.ForEach(room =>
            {
                var member = members.Single(mem => mem.Id == room.Id);
                room.Members.Add(member);
                member.Room = room;
            });
        }

        public static List<RoomModel> GetRooms()
        {
            return (List<RoomModel>)HttpContext.Current.Application["Rooms"];
        }

        public static List<MemberModel> GetMembers(int? roomId =null)
        {
            if (roomId != null)
            {
                var members = ((List<MemberModel>)HttpContext.Current.Application["Members"])
                    .Where(x => x.Room.Id == roomId).ToList();
                return members;
            }
            return (List<MemberModel>)HttpContext.Current.Application["Members"];
        }

        public static RoomModel GetRoom(int id)
        {
            var rooms = (List<RoomModel>)HttpContext.Current.Application["Rooms"];
            return rooms.FirstOrDefault(x => x.Id == id);
        }

        public static MemberModel GetMember(int id)
        {
            var members = (List<MemberModel>)HttpContext.Current.Application["Members"];
            return members.FirstOrDefault(x => x.Id == id);
        }

        public static List<RoomModel> GetRooms(string filter)
        {
            if (string.IsNullOrEmpty(filter))
            {
                return (List<RoomModel>)HttpContext.Current.Application["Rooms"];
            }
            var comp = StringComparison.OrdinalIgnoreCase;
            var rooms = (List<RoomModel>) HttpContext.Current.Application["Rooms"];
            return rooms.Where(x => x.Name.Contains(filter, comp) || x.Description.Contains(filter, comp)).ToList();
        }

        public static void CreateRoom(string name)
        {
            var rooms = (List<RoomModel>)HttpContext.Current.Application["Rooms"];
            var room = new RoomModel
            {
                Id = rooms.Max(x => x.Id) + 1,
                Name = name,
                Description = String.Empty
            };
            rooms.Add(room);
            HttpContext.Current.Application["Rooms"] = rooms.OrderBy(x => x.Name).ToList();
        }

        public static bool CreateMember(string name, int roomId)
        {
            var members = (List<MemberModel>)HttpContext.Current.Application["Members"];
            var rooms = (List<RoomModel>)HttpContext.Current.Application["Rooms"];
            var room = rooms.FirstOrDefault(x => x.Id == roomId);
            if (room == null)
            {
                return false;
            }

            var member = new MemberModel
            {
                Id = members.Max(x => x.Id) + 1,
                Name = name,
                Room = room,
                Order = room.Members.Any() 
                ? room.Members.Max(x => x.Order) + 1
                :  1
            };
            members.Add(member);
            room.Members.Add(member);
            HttpContext.Current.Application["Members"] = members.OrderBy(x => x.Name).ToList();
            HttpContext.Current.Application["Rooms"] = rooms.OrderBy(x => x.Name).ToList();
            return true;
        }

        public static void Update(RoomModel roomModel)
        {
            var rooms = (List<RoomModel>)HttpContext.Current.Application["Rooms"];
            var room = rooms.FirstOrDefault(x => x.Id == roomModel.Id);
            if (room != null)
            {
                room.Name = roomModel.Name;
                room.Description = roomModel.Description;
            }
            HttpContext.Current.Application["Rooms"] = rooms.OrderBy(x => x.Name).ToList();
        }

        public static void Update(MemberModel memberModel)
        {
            var members = (List<MemberModel>)HttpContext.Current.Application["Members"];
            var member = members.FirstOrDefault(x => x.Id == memberModel.Id);
            if (member != null)
            {
                member.Name = memberModel.Name;
            }
            HttpContext.Current.Application["Members"] = members.OrderBy(x => x.Name).ToList();
        }

        public static void DeleteRoom(int id)
        {
            var rooms = (List<RoomModel>)HttpContext.Current.Application["Rooms"];
            var room = rooms.FirstOrDefault(x => x.Id == id);
            if (room != null)
            {
                var members = (List<MemberModel>)HttpContext.Current.Application["Members"];
                members.RemoveAll(x => x.Room.Id == room.Id);
                rooms.Remove(room);
                HttpContext.Current.Application["Rooms"] = rooms;
                HttpContext.Current.Application["Members"] = members;
            }
        }

        public static void DeleteMember(int id)
        {
            var members = (List<MemberModel>)HttpContext.Current.Application["Members"];
            var member = members.FirstOrDefault(x => x.Id == id);
            if (member != null)
            {
                var rooms = (List<RoomModel>)HttpContext.Current.Application["Rooms"];
                var room = rooms.FirstOrDefault(x => x.Id == member.Room.Id);
                room.Members.Remove(member);
                members.Remove(member);
                HttpContext.Current.Application["Members"] = members;
                HttpContext.Current.Application["Rooms"] = rooms;
            }
        }
    }
}