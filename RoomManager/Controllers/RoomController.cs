using System.Collections.Generic;
using System.Net.Http;
using System.Web.Http;
using RoomManager.Helpers;
using RoomManager.Models;

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
        public RoomModel Get(int id)
        {
            return MockDataBase.GetRoom(id);
        }

        // GET api/room/searchText
        public IEnumerable<RoomModel> Get(string filter)
        {
            return MockDataBase.GetRooms(filter);
        }

        // POST api/room
        public HttpResponseMessage Post(RoomModel model)
        {
            MockDataBase.CreateRoom(model.Name);
            return Request.CreateResponse(System.Net.HttpStatusCode.Created, MockDataBase.GetRooms());
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
