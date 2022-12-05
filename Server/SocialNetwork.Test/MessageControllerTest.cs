using Microsoft.VisualStudio.TestTools.UnitTesting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Entity.Interfaces;
using Moq;
using SocialNetwork.Api.Controllers;
using SocialNetwork.Entity;
using SocialNetwork.Infrastructure;
using API.Helpers;
using SocialNetwork.Api.Dto;

namespace SocialNetwork.Test
{
    [TestClass]
    public class MessageControllerTest
    {
        private IMapper _mapper;
        private Mock<IGenericRepository<Message>> _messageRepositoryMock;


        [TestInitialize]
        public void Setup()
        {
            var mappingConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new MappingProfiles());
            });
            var mapper = mappingConfig.CreateMapper();
            _mapper = mapper;

            _messageRepositoryMock = new Mock<IGenericRepository<Message>>();
        }

        [TestMethod]
        public async Task GetMessagesToUser_ShouldReturnAllMessagesToUser()
        {
            // Arrange
            var genericRepository = new Mock<IGenericRepository<Message>>();
            
            genericRepository.Setup(x => x.ListAllAsync())
                .ReturnsAsync(new List<Message>
                {
                    new Message
                    {
                        Id = 1,
                        From = new User {
                           Id = 1,
                           Name = "Test User A"
                        },
                        To = new User {
                           Id = 2,
                           Name = "Test User B"
                        },
                        CreatedDate = DateTime.Now,
                        Content = "Hello User B"
                    },
                    new Message
                    {
                        Id = 2,
                        From = new User {
                           Id = 2,
                           Name = "Test User B"
                        },
                        To = new User {
                           Id = 1,
                           Name = "Test User A"
                        },
                        CreatedDate = DateTime.Now,
                        Content = "Hello User A"
                    },
                    new Message
                    {
                        Id = 3,
                        From = new User {
                           Id = 1,
                           Name = "Test User A"
                        },
                        To = new User {
                           Id = 3,
                           Name = "Test User C"
                        },
                        CreatedDate = DateTime.Now,
                        Content = "Hello User C"
                    }
                });
            var messageController = new MessageController(genericRepository.Object, _mapper);
            
            // Act
            var _sup = await messageController.GetAllMessages();

            // Assert
            Assert.AreEqual(3, _sup.Messages.Count);

        }
    }
}
