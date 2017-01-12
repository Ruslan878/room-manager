using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Http;
using RoomManager.Helpers;
using RoomManager.Models;
using RoomManager.Extensions;

namespace RoomManager.Controllers
{
    public class RoomController : ApiController
    {
        // GET api/room
        public IEnumerable<RoomModel> Get()
        {
            return MockDataBase.GetRooms();
        }

        // GET api/room/5
        public string Get(int id)
        {
            return "value";
        }

        // GET api/room/searchText
        public IEnumerable<RoomModel> Get(string filter)
        {
            var comp = StringComparison.OrdinalIgnoreCase;
            return MockDataBase.GetRooms().Where(x => x.Name.Contains(filter, comp) || x.Description.Contains(filter, comp));
        }

        // POST api/room
        public void Post([FromBody]string value)
        {
        }

        // PUT api/room/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/room/5
        public void Delete(int id)
        {
        }
    }
}
