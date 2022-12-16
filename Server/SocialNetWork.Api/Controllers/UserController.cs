using AutoMapper;
using Entity.Interfaces;
using Microsoft.AspNetCore.Mvc;
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

        public UserController(
            IMapper mapper,
            IGenericRepository<User> userRepository)
        {
            _mapper = mapper;
            _userRepository = userRepository;
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

    }
}
