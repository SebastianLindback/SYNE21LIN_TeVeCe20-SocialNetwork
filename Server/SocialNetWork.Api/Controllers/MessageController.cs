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
            User sender = await _userRepository.GetByIdAsync(id: senderId); 
            User receiver = await _userRepository.GetByIdAsync(receiverId); 

            if (sender == null) return BadRequest("sender user not found");
            if (receiver == null) return BadRequest("receiver user not found");

            var message = new Message {
                Sender = sender,
                Receiver = receiver,
                CreatedDate = DateTime.Now,
                Content = string.IsNullOrEmpty(content) ? "" : content
            };
            
            var numberOfAddedEntities = await _messageRepository.CreateAsync(message);
            var uploadSuccessfull = numberOfAddedEntities > 0;
            if (uploadSuccessfull) return "Message Created Successfully";            
            return BadRequest("Problem creating Message");
        }

    [HttpGet("conversation")]
    public async Task<MessagesDto> GetConversation([FromQuery] int userA, [FromQuery] int userB)
        {
            var spec = new MessageFilter_UsersConversation(userA, userB);
            var messages = await _messageRepository.ListWithSpec(spec);
            
            var messageDtos = _mapper.Map<ICollection<MessageDto >>(messages);
            return new MessagesDto
            {
                Messages = messageDtos
            };
        }

}

