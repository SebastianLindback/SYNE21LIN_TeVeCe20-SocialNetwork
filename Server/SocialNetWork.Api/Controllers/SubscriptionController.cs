using System.Linq;
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

        [HttpGet("GetSubscriptions")]
        public async Task<SubscriptionsDto> GetUserSubscriptions([FromQuery] int userId)
        {
            var spec = new Subscribe_Filter_GetUser_Subscribtions(userId);
            var subscriptions = await _subscriptionRepository.ListWithSpec(spec);
            var distinctSubscriptions = subscriptions.DistinctBy(x => x.SubscribedToId).OrderByDescending(x => x.CreatedDate).ToList();
            
            

            var subscriptionDtos = _mapper.Map<ICollection<SubscriptionDto>>(distinctSubscriptions);
            subscriptionDtos.ToList().ForEach(async x =>
            {
                var user = await _userRepository.GetByIdAsync(x.SubscribedToId);
                x.Name = user.Name;
            });
            return new SubscriptionsDto
            {
                Subscriptions = subscriptionDtos
            };
        }

        [HttpDelete("delete")]
        public async Task<ActionResult<string>> DeleteSubscriptions([FromQuery] int subscriberId,[FromQuery] int subscribedToId)
        {
            var deletedRecords = 0;
            var spec = new Subscribe_Filter_GetSubscribtions(subscriberId, subscribedToId);
            var subscriptions = await _subscriptionRepository.ListWithSpec(spec);
            
            foreach (var subscription in subscriptions)
            {
                deletedRecords += await _subscriptionRepository.RemoveEntryByIdAsync(subscription.Id);
            }

            if (deletedRecords != 0) return Ok("subscription removed");
            
            return BadRequest("no subscription removed");

            
        }

        [HttpGet("follow/{subscriber}/{subscribedTo}")]
        public async Task<ActionResult<SubscriptionsDto>> Follow(int subscriber, int subscribedTo)
        {
            var spec = new Subscribe_Filter_GetSubscribtions(subscriber, subscribedTo);
            var Subscriptions = await _subscriptionRepository.ListWithSpec(spec);
            if (Subscriptions.Any()) return BadRequest(error: "Subscription already exist");

            var User = await _userRepository.GetByIdAsync(subscriber);
            var Follower = await _userRepository.GetByIdAsync(subscribedTo);
            if (User == null) return BadRequest(error: "User not found");
            if (Follower == null) return BadRequest(error: "User not found");

            var Subscription = new Subscription
            {
                Subscriber = User,
                SubscribedTo = Follower,
                CreatedDate = DateTime.Now
            };
            var uploadCount = await _subscriptionRepository.CreateAsync(Subscription);
            if (uploadCount > 0) return Ok("Subscribed successfull");
            
            return BadRequest("Issue creating subscription");
        }
        

    }
    
}