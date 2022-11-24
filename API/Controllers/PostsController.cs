using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTO;
using AutoMapper;
using Entity;
using Infrastructure;
using Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class PostsController : BaseController
{
        private readonly IGenericRepository<Post> _repository;
        private readonly IMapper _mapper;

        public PostsController(IGenericRepository<Post> repository, IMapper mapper)
        {
            _mapper = mapper;
            _repository = repository;

        }

        [HttpGet]
        public async Task<ActionResult<List<PostsDTO>>> GetPosts()
        {
            var posts = await _repository.ListAllAsync();
            return Ok(_mapper.Map<IReadOnlyList<Post>, IReadOnlyList<PostsDTO>>(posts));
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<PostsDTO>> GetPost(Guid id)
        {
            var posts = await _repository.GetByIdAsync(id);
            return _mapper.Map<Post, PostsDTO>(posts);
        }

}
