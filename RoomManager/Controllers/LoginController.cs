using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using RoomManager.Models;

namespace RoomManager.Controllers
{
    public class LoginController : ApiController
    {
        // POST api/login
        public IHttpActionResult Post(LoginModel loginModel)
        {
            //if (!ModelState.IsValid)
            //{
            //    return BadRequest(ModelState);
            //}

            //Emulate  Authentication
            return Ok(new { auth_token = "fake_user_auth_token_00xx11"});
        }
    }
}