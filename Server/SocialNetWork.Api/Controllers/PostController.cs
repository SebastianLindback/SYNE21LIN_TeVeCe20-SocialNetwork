using AutoMapper;
using Entity.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using SocialNetwork.Api.Dto;
using SocialNetwork.Entity;
using SocialNetwork.Entity.Specification;

namespace SocialNetwork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PostController : ControllerBase
    {
        private readonly IGenericRepository<Post> _postRepository;
        private readonly IGenericRepository<User> _userRepository;
        private readonly IMapper _mapper;

        public PostController(
            IGenericRepository<Post> postRepository, 
            IMapper mapper, 
            IGenericRepository<User> userRepository)
        {
            _postRepository = postRepository;
            _mapper = mapper;
            _userRepository = userRepository;
        }

        [HttpGet]
        public async Task<PostsDto> Get()
        {
            var posts = await _postRepository.ListAllAsync();
            var postDtos = _mapper.Map<ICollection<PostDto>>(posts.OrderByDescending(x => x.CreatedDate));
            foreach (var postDto in postDtos)
            {
                var user = await _userRepository.GetByIdAsync(postDto.Id);
                postDto.UserName = user.Name;
            }
            return new PostsDto
            {
                Posts = postDtos
            };
        }

        [HttpGet("{userId}")]
        public async Task<PostDto> Get(int userId)
        {
            var post = await _postRepository.GetByIdAsync(userId);
            var postDto = _mapper.Map<PostDto>(post);
            return postDto;
        }


        [HttpPost]
        public async Task<PostDto> Post(PostDto postDto)
        {
            var post = _mapper.Map<Post>(postDto);
            var user = await _userRepository.GetByIdAsync(postDto.UserId);
            if (user != null) post.User = user;

            var postCreated = await _postRepository.CreateAsync(post);
            var postCreatedDto = _mapper.Map<PostDto>(post);
            
            return postCreatedDto;
        }

        
    }
}
