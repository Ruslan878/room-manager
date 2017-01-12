using System.Web;
using RoomManager.Models;

namespace RoomManager.Helpers
{
    //This class emulate work with DB
    public static class MockDataBase
    {
        private static RoomModel[] rooms = {
            new RoomModel { Id = 1, Name = "Room 101", Description = "Small room"},
            new RoomModel { Id = 2, Name = "Room 203", Description = "Large room"},
            new RoomModel { Id = 3, Name = "Room 406", Description = "Meeting room"},
            new RoomModel { Id = 4, Name = "Rest room 6 floor", Description = "Large room"},
            new RoomModel { Id = 5, Name = "Room 1009", Description = "Large Rest room"}
        };

        public static  void InitializeData()
        {
            HttpContext.Current.Application["Rooms"] = rooms;
        }

        public static RoomModel[] GetRooms()
        {
            return (RoomModel[])HttpContext.Current.Application["Rooms"];
        }
    }
}