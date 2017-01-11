using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace RoomManager.Controllers
{
    public class RoomsController : ApiController
    {
        // GET api/rooms
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/rooms/5
        public string Get(int id)
        {
            return "value";
        }

        // POST api/rooms
        public void Post([FromBody]string value)
        {
        }

        // PUT api/rooms/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/rooms/5
        public void Delete(int id)
        {
        }
    }
}
