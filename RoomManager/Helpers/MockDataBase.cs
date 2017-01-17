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
            new RoomModel { Id = 1, Name = "Room 101", Description = "Small room"},
            new RoomModel { Id = 2, Name = "Room 203", Description = "Large room"},
            new RoomModel { Id = 3, Name = "Room 406", Description = "Meeting room"},
            new RoomModel { Id = 4, Name = "Rest room 6 floor", Description = "Large room"},
            new RoomModel { Id = 5, Name = "Room 1009", Description = "Large Rest room"}
        };

        public static  void InitializeData()
        {
            HttpContext.Current.Application["Rooms"] = rooms.OrderBy(x => x.Name).ToList();
        }

        public static List<RoomModel> GetRooms()
        {
            return (List<RoomModel>)HttpContext.Current.Application["Rooms"];
        }

        public static RoomModel GetRoom(int id)
        {
            var rooms = (List<RoomModel>)HttpContext.Current.Application["Rooms"];
            return rooms.FirstOrDefault(x => x.Id == id);
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

        public static void Delete(int id)
        {
            var rooms = (List<RoomModel>)HttpContext.Current.Application["Rooms"];
            var room = rooms.FirstOrDefault(x => x.Id == id);
            if (room != null)
            {
                rooms.Remove(room);
                HttpContext.Current.Application["Rooms"] = rooms;
            }
        }
    }
}