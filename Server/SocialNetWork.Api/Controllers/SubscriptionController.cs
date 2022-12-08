using System.Linq;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;
using SocialNetwork.Api.Dto;
using SocialNetwork.Entity;
using SocialNetwork.Entity.Interface;
using SocialNetwork.Infrastructure;

namespace SocialNetwork.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SubscriptionController : ControllerBase
    {
         private readonly IGenericRepository<Subscription> _subscriptionRepository;

         private readonly IGenericRepository<User> _userRepository;
        

        private readonly IMapper _mapper;

        public SubscriptionController(
           IGenericRepository<Subscription> subscriptionRepository,
           IGenericRepository<User> userRepository,
            IMapper mapper
        )
        {
            _subscriptionRepository = subscriptionRepository;
            _userRepository = userRepository;
             _mapper = mapper;
          
        }

        [HttpGet]
        public async Task<SubscriptionsDto> Get()
        {
           // var Subscriptions = await _subscriptionRepository.ListAllAsync();
           var Subscriptions = await _subscriptionRepository.ListAllAsync();
           var subscriptionDtos = _mapper.Map<ICollection<SubscriptionDto>>(Subscriptions.OrderByDescending(x => x.CreatedDate));
            return new SubscriptionsDto
            {
                Subscriptions = subscriptionDtos
            };
        }

        [HttpGet("follow")]
        public async Task<ActionResult<SubscriptionsDto>> Follow([FromQuery] int Subscriber,[FromQuery] int SubscribedTo)
        {
           // var Subscriptions = await _subscriptionRepository.ListAllAsync();
           var User = await _userRepository.GetByIdAsync(Subscriber);
           var Follower = await _userRepository.GetByIdAsync(SubscribedTo);
           if(Follower == null){
            return BadRequest(error: "User not found");
           }
           if(User == null){
            return BadRequest(error: "User not found");
           }
           var Subscription = new Subscription{
            Subscriber = User, 
            SubscribedTo = Follower,
            CreatedDate = DateTime.Now
           };
           var Succeeding = await _subscriptionRepository.CreateAsync(Subscription);
           if(Succeeding != null){
            return Ok("Subscribed successfull");
           }
           return BadRequest("Issue creating subscription");
        }
    
    }
}
