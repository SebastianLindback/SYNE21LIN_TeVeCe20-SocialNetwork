using AutoMapper;
using Entity.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Api.Dto;
using SocialNetwork.Entity;
using SocialNetwork.Entity.Specification;
using SocialNetwork.Infrastructure;

namespace SocialNetwork.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly IGenericRepository<Message> _messageRepository;
    private readonly IGenericRepository<User> _userRepository;
    private readonly IMapper _mapper;

    public MessageController(
        IGenericRepository<Message> messageRepository, 
        IGenericRepository<User> userRepository, 
        IMapper mapper)
    {
        _messageRepository = messageRepository;
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<MessagesDto> GetAllMessages()
    {
        var messages = await _messageRepository.ListAllAsync();
        var messageDtos = _mapper.Map<ICollection<MessageDto>>(messages.OrderByDescending(x => x.Id));
        return new MessagesDto
        {
            Messages = messageDtos
        };
    }
    [HttpPost("create")]
        public async Task<ActionResult<string>> CreateMessage([FromQuery] int senderId, [FromQuery] int receiverId, [FromQuery] string content)
        {
            var userResult = await getUsers(new int[]{senderId, receiverId});
            if (userResult.userIdsNotFound.Any()){
                return BadRequest("Unable to find the user for id: " + string.Join(",", userResult.userIdsNotFound));
            }

            var message = new Message {
                Sender = userResult.users.Where(x => x.Id == senderId).FirstOrDefault(),
                Receiver = userResult.users.Where(x => x.Id == receiverId).FirstOrDefault(),
                CreatedDate = DateTime.Now,
                Content = string.IsNullOrEmpty(content) ? "" : content
            };
            
            var numberOfAddedEntities = await _messageRepository.CreateAsync(message);
            var uploadSuccessfull = numberOfAddedEntities > 0;
            if (uploadSuccessfull) return Ok("Message Created Successfully");            
            return BadRequest("Problem creating Message");
        }

    private async Task<(List<User> users, List<int> userIdsNotFound)> getUsers(int[] UserIds)
    {
        var userIdsNotFound = new List<int>();
        var users = new List<User>{};
        
        foreach(int userId in UserIds){
            User user = await _userRepository.GetByIdAsync(id: userId); 
            
            if (user == null) userIdsNotFound.Add(userId);
            users.Add(user!);
        }
        
        return (users : users, userIdsNotFound : userIdsNotFound);

    }

    [HttpGet("conversation")]
    public async Task<ActionResult<MessagesDto>> GetConversation([FromQuery] int userA, [FromQuery] int userB)
        {
            
            var userResult = await getUsers(new int[]{userA, userB});
            if (userResult.userIdsNotFound.Any()){
                return BadRequest("Unable to find the user for id: " + string.Join(",", userResult.userIdsNotFound));
            }

            var spec = new MessageFilter_UsersConversation(userA, userB);
            var messages = await _messageRepository.ListWithSpec(spec);
            
            var messageDtos = _mapper.Map<ICollection<MessageDto >>(messages);
            return Ok(new MessagesDto
            {
                Messages = messageDtos
            });
        }

}

