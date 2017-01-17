using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RoomManager.Helpers;
using RoomManager.Models;

namespace RoomManager.Controllers
{
    public class MembersController : ApiController
    {
        // GET api/member
        public IEnumerable<MemberModel> Get()
        {
            return MockDataBase.GetMembers();
        }

        // GET api/member/5
        public MemberModel Get(int id)
        {
            return MockDataBase.GetMember(id);
        }

        // POST api/member
        public HttpResponseMessage Post(MemberModel model)
        {
            MockDataBase.CreateRoom(model.Name);
            return Request.CreateResponse(HttpStatusCode.Created, MockDataBase.GetMembers());
        }

        // PUT api/member
        public HttpResponseMessage Put(int id, [FromBody]MemberModel member)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != member.Id)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            MockDataBase.Update(member);

            return Request.CreateResponse(HttpStatusCode.OK, MockDataBase.GetMembers());
        }

        // DELETE api/member/5
        public void Delete(int id)
        {
            var member = MockDataBase.GetMember(id);
            if (member == null)
            {
                throw new HttpResponseException(HttpStatusCode.NotFound);
            }

            MockDataBase.DeleteMember(id);
        }
    }
}