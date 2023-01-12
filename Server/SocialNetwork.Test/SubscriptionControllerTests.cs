using AutoMapper;
using Moq;
using SocialNetwork.Api.Controllers;
using SocialNetwork.Entity;
using API.Helpers;
using Entity.Interfaces;
using SocialNetwork.Entity.Specification;
using Microsoft.AspNetCore.Mvc;

namespace SocialNetwork.Test
{
    [TestClass]
    public class SubscriptionControllerTest
    {
        private IMapper _mapper;
        private Mock<IGenericRepository<Subscription>> _subscriptionRepositoryMock;
          private Mock<IGenericRepository<User>> _userRepositoryMock;

        [TestInitialize]
        public void Setup()
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfiles());
            });
            var mapper = mappingConfig.CreateMapper();
            _mapper = mapper;

            _subscriptionRepositoryMock = new Mock<IGenericRepository<Subscription>>();
              _userRepositoryMock = new Mock<IGenericRepository<User>>();
        }

        [TestMethod]
        public async Task ShouldGetAllUserFromControllerAsync()
        {
            // Arrange
            _subscriptionRepositoryMock.Setup(x => x.ListAllAsync())
                .ReturnsAsync(new List<Subscription>
                {
                    new Subscription{
                        Id = 1,
                        CreatedDate = DateTime.Now,
                        SubscriberId = 1,
                        SubscribedToId = 2
                    }
                });
            var subscriptionController = new SubscriptionController(_subscriptionRepositoryMock.Object, _userRepositoryMock.Object,  _mapper);
            // Act
            var subscriptions = await subscriptionController.Get();
            // Assert
            Assert.AreEqual(1, subscriptions.Subscriptions.Count);

        }  

         [TestMethod]
        public async Task GetUserSubscriptions_ShouldReturnUserSubscriptions()
        {
            // Arrange
            _subscriptionRepositoryMock.Setup(x => x.ListWithSpec(It.IsAny<ISpecification<Subscription>>()))
                .ReturnsAsync(new List<Subscription>
                {
                    new Subscription{
                        Id = 1,
                        CreatedDate = DateTime.Now,
                        SubscriberId = 1,
                        SubscribedToId = 2
                    }
                });
            var subscriptionController = new SubscriptionController(_subscriptionRepositoryMock.Object, _userRepositoryMock.Object,  _mapper);
            // Act
            var subscriptions = await subscriptionController.GetUserSubscriptions(1);
            // Assert
            Assert.AreEqual(1, subscriptions.Subscriptions.Count);

        }       

        [TestMethod]
        public async Task Follow_ShouldAddSubscriptionToDB()
        {
            // Arrange

            _userRepositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync((int x) => 
                new User {
                    Id = x,
                    Name = "Test User"
                }
            );
            _subscriptionRepositoryMock.Setup(x => x.ListWithSpec(It.IsAny<ISpecification<Subscription>>())).ReturnsAsync(new List<Subscription>()); 
            _subscriptionRepositoryMock.Setup(x => x.CreateAsync(It.IsAny<Subscription>())).ReturnsAsync(1); 
            
            var subscriptionController = new SubscriptionController(_subscriptionRepositoryMock.Object, _userRepositoryMock.Object,_mapper);
            
            var subscriberId = 1;
            var subscribedToId = 2;
            
            // Act
            var _sup = await subscriptionController.Follow(subscriberId, subscribedToId);
            var result = _sup.Result as OkObjectResult;
            // Assert
            Assert.AreEqual("Subscribed successfull", result!.Value);



        }

        [TestMethod]
        public async Task Delete_ShouldRemoveSubscriptionFromDB()
        {
            // Arrange
            _subscriptionRepositoryMock.Setup(x => x.ListWithSpec(It.IsAny<ISpecification<Subscription>>()))
            .ReturnsAsync(new List<Subscription>{
                new Subscription{
                    Id=1
                }
            }); 
            _subscriptionRepositoryMock.Setup(x => x.RemoveEntryByIdAsync(It.IsAny<int>())).ReturnsAsync(1); 
            
            var subscriptionController = new SubscriptionController(_subscriptionRepositoryMock.Object, _userRepositoryMock.Object,_mapper);
            
            var subscriberId = 1;
            var subscribedToId = 2;
            
            // Act
            var _sup = await subscriptionController.DeleteSubscriptions(subscriberId, subscribedToId);
            var result = _sup.Result as OkObjectResult;
            // Assert
            Assert.AreEqual("subscription removed", result!.Value);



        }

    }
}