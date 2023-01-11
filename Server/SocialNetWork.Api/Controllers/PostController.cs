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
                var receiver = await _userRepository.GetByIdAsync(postDto.ReceiverId);
                postDto.ReceiverName = receiver.Name;
                var sender = await _userRepository.GetByIdAsync(postDto.SenderId);
                postDto.SenderName = sender.Name;
            }
            return new PostsDto
            {
                Posts = postDtos
            };
        }

        [HttpGet("{toUserId}")]
        public async Task<ICollection<PostDto>> Get(int toUserId)
        {
            var spec = new PostFilter_GetPostsToUser(toUserId);
            var posts = await _postRepository.ListWithSpec(spec);
            var postsDto = _mapper.Map<ICollection<PostDto>>(posts);
            return postsDto;
        }

        [HttpPost("from/users")]
        public async Task<PostsDto> GetPostsFromUsers([FromBody] int[] usersId)
        {
            var spec = new PostFilter_GetPostsFromUsers(usersId);
            var posts = await _postRepository.ListWithSpec(spec);
            var postsDtos = _mapper.Map<ICollection<PostDto>>(posts);
            return new PostsDto
            {
                Posts = postsDtos
            };
        }


        [HttpPost]
        public async Task<PostDto> Post(PostDto postDto)
        {
            var post = _mapper.Map<Post>(postDto);
            var sender = await _userRepository.GetByIdAsync(postDto.SenderId);
            if (sender != null) post.Sender = sender;

            var receiver = await _userRepository.GetByIdAsync(postDto.ReceiverId);
            if (receiver != null) post.Receiver = receiver;

            var postCreated = await _postRepository.CreateAsync(post);
            var postCreatedDto = _mapper.Map<PostDto>(post);
            
            return postCreatedDto;
        }

        
    }
}
