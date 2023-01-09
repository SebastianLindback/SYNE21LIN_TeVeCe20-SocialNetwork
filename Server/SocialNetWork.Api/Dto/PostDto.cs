﻿using SocialNetwork.Entity;
using System.ComponentModel.DataAnnotations.Schema;

namespace SocialNetwork.Api.Dto
{
    public class PostDto
    {
        public int Id { get; set; }

        public string? Message { get; set; }
        public DateTime CreatedDate { get; set; }

        public int UserId { get; set; }

        public string? UserName { get; set; }

    }
}
