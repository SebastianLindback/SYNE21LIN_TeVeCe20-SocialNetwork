using System.Security.Cryptography.X509Certificates;
using AutoMapper;
using Entity.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using SocialNetwork.Api.Dto;
using SocialNetwork.Entity;
using SocialNetwork.Entity.Specification;
using SocialNetwork.Infrastructure;

namespace SocialNetwork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IGenericRepository<User> _userRepository;
        private readonly IMapper _mapper;

        private readonly SocialNetworkContext _context;

        public UserController(
            IMapper mapper,
            IGenericRepository<User> userRepository,
            SocialNetworkContext context
            )
        {
            _mapper = mapper;
            _userRepository = userRepository;
            _context = context;
        }

        [HttpGet]
        public async Task<UsersDto> Get()
        {
            var users = await _userRepository.ListAllAsync();
            var userDtos = _mapper.Map<ICollection<UserDto>>(users);
            return new UsersDto
            {
                Users = userDtos
            };
        }

        [HttpGet("create")]
        public async Task<ActionResult<UsersDto>> CreateUser([FromQuery] string name)
        {
            var spec = new UserFilter_GetUserName(name);
            var userExist = await _userRepository.GetPropWithSpec(spec);
            if (userExist != null)
            {
                return BadRequest("User already exists");
            }
            var newUser = new User { Name = name };
            var uploadSuccessfull = await _userRepository.CreateAsync(newUser);
            if (uploadSuccessfull > 0)
            {
                return Ok("User created");
            }
            return BadRequest("Issue creating new user");
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<string>> DeleteUser([FromQuery] int id)
        {
            var userExist = await _userRepository.GetByIdAsync(id);
            if (userExist == null)
            {
                return BadRequest("User does not exist");
            }

            var removedEntity = await _userRepository.RemoveEntryByIdAsync(userExist.Id);
            if (removedEntity != 0)
            {
                return Ok("User removed");
            }
            return BadRequest("Issue removing user");
        }

        [HttpPost("posts")]
        public async Task<UsersDto> GetPostsFromSubscribers(int[] usersId)
        {
            var spec = new UserFilter_GetUserPosts(usersId);
            var users = await _userRepository.ListWithSpec(spec);
            var userDtos = _mapper.Map<ICollection<UserDto>>(users);
            return new UsersDto
            {
                Users = userDtos
            };
        }

    }
}
