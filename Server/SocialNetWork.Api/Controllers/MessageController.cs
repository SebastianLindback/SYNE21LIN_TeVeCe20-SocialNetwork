using AutoMapper;
using Entity.Interfaces;
using Microsoft.AspNetCore.Mvc;
using SocialNetwork.Api.Dto;
using SocialNetwork.Entity;

namespace SocialNetwork.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MessageController : ControllerBase
{
    private readonly IGenericRepository<Message> _messageRepository;
    private readonly IMapper _mapper;

    public MessageController(
        IGenericRepository<Message> messageRepository, 
        IMapper mapper)
    {
        _messageRepository = messageRepository;
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

}

