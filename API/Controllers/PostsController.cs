using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Entity;
using Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class PostsController : BaseController
{
        private readonly SocialNetworkContext _context;
        public PostsController(SocialNetworkContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<Post>>> GetPosts()
        {
            return await _context.Posts!.ToListAsync();
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(Guid id)
        {
            var result = await _context.Posts!.FindAsync(id);
            if (result != null) return result;
            return new Post();
        }

}
