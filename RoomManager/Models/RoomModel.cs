using System;
using System.Collections.Generic;
using System.Runtime.Serialization;
using System.Web.Script.Serialization;
using System.Xml.Serialization;

namespace RoomManager.Models
{
    [DataContract]
    public class RoomModel
    {
        [DataMember]
        public int Id { get; set; }

        [DataMember]
        public string Name { get; set; }

        [DataMember]
        public string Description { get; set; }

        public List<MemberModel> Members { get; set; }

        [DataMember]
        public int MembersCount => this.Members.Count;

        public RoomModel()
        {
            this.Members = new List<MemberModel>();
        }
    }
}