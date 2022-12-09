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
    }
}