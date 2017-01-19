using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RoomManager.Helpers;
using RoomManager.Models;

namespace RoomManager.Controllers
{
    public class RoomsController : ApiController
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

        // GET api/room/filter
        public IEnumerable<RoomModel> Get(string filter)
        {
            return MockDataBase.GetRooms(filter);
        }

        // POST api/room
        public HttpResponseMessage Post(RoomModel model)
        {
            MockDataBase.CreateRoom(model.Name);
            return Request.CreateResponse(HttpStatusCode.Created, MockDataBase.GetRooms());
        }

        // PUT api/room
        public HttpResponseMessage Put(int id, [FromBody]RoomModel room)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != room.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            MockDataBase.Update(room);

            return Request.CreateResponse(HttpStatusCode.OK, MockDataBase.GetRooms());
        }

        // DELETE api/room/5
        public void Delete(int id)
        {
            var room = MockDataBase.GetRoom(id);
            if (room == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            MockDataBase.DeleteRoom(id);
        }
    }
}
