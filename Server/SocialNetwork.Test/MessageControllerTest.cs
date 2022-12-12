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
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using SocialNetwork.Entity.Specification;

namespace SocialNetwork.Test
{
    [TestClass]
    public class MessageControllerTest
    {
        private IMapper _mapper;
        private Mock<IGenericRepository<Message>> _messageRepositoryMock;
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
            _messageRepositoryMock = new Mock<IGenericRepository<Message>>();
            _userRepositoryMock = new Mock<IGenericRepository<User>>();
            
            }

        [TestMethod]
        public async Task CreateMessage_ShouldAddMessageToDB()
        {
            // Arrange
            var _messageRepositoryMock = new Mock<IGenericRepository<Message>>();
            var _userRepositoryMock = new Mock<IGenericRepository<User>>();

            _userRepositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync((int x) => 
                new User {
                    Id = x,
                    Name = "Test User"
                }
            );
            _messageRepositoryMock.Setup(x => x.CreateAsync(It.IsAny<Message>())).ReturnsAsync(1); 
            
            var messageController = new MessageController(_messageRepositoryMock.Object, _userRepositoryMock.Object,_mapper);
            
            var senderId = 1;
            var receiverId = 2;
            string subject = "test";
            // Act
            var _sup = await messageController.CreateMessage(senderId,receiverId,subject);
            // Assert
            Assert.AreEqual("Message Created Successfully", _sup.Value);


        }

        [TestMethod]
        public async Task CreateMessage_ShouldReturnBadRequestIfUserNotFound()
        {
            // Arrange
            var _messageRepositoryMock = new Mock<IGenericRepository<Message>>();
            var _userRepositoryMock = new Mock<IGenericRepository<User>>();

            _userRepositoryMock.Setup(x => x.GetByIdAsync(1))
            .ReturnsAsync( 
                new User {
                    Id = 1,
                    Name = "Test User"
                }
            );
            _messageRepositoryMock.Setup(x => x.CreateAsync(It.IsAny<Message>())).ReturnsAsync(1); 
            
            var messageController = new MessageController(_messageRepositoryMock.Object, _userRepositoryMock.Object,_mapper);
            
            var senderId = 1;
            var receiverId = 2;
            var subject = "test";
            // Act
            var _sup = await messageController.CreateMessage(senderId,receiverId,subject);
            // Assert
            var expectBadRequest = _sup.Result as BadRequestObjectResult;
            Assert.IsNotNull(expectBadRequest);
            Assert.AreEqual("receiver user not found",expectBadRequest.Value);

        }

        
        [TestMethod]
        public async Task GetAllMessages_ShouldReturnAllMessages()
        {
            // Arrange
            var _messageRepositoryMock = new Mock<IGenericRepository<Message>>();
            var _userRepositoryMock = new Mock<IGenericRepository<User>>();
            
            _messageRepositoryMock.Setup(x => x.ListAllAsync())
                .ReturnsAsync(new List<Message>
                {
                    new Message
                    {
                        Id = 1,
                        Sender = new User {
                           Id = 1,
                           Name = "Test User A"
                        },
                        Receiver = new User {
                           Id = 2,
                           Name = "Test User B"
                        },
                        CreatedDate = DateTime.Now,
                        Content = "Hello User B"
                    },
                    new Message
                    {
                        Id = 2,
                        Sender = new User {
                           Id = 2,
                           Name = "Test User B"
                        },
                        Receiver = new User {
                           Id = 1,
                           Name = "Test User A"
                        },
                        CreatedDate = DateTime.Now,
                        Content = "Hello User A"
                    },
                    new Message
                    {
                        Id = 3,
                        Sender = new User {
                           Id = 1,
                           Name = "Test User A"
                        },
                        Receiver = new User {
                           Id = 3,
                           Name = "Test User C"
                        },
                        CreatedDate = DateTime.Now,
                        Content = "Hello User C"
                    }
                });
            var messageController = new MessageController(_messageRepositoryMock.Object, _userRepositoryMock.Object, _mapper);
            
            // Act
            var _sup = await messageController.GetAllMessages();

            // Assert
            Assert.AreEqual(3, _sup.Messages.Count);

        }
        [TestMethod]
        public async Task GetConversation_ShouldReturnUsersConversation()
        {
            // Arrange
            _messageRepositoryMock.Setup(x => x.ListWithSpec(It.IsAny<ISpecification<Message>>()))
                .ReturnsAsync(new List<Message>
                {
                    new Message
                    {
                        Id = 1,
                        Sender = new User {
                           Id = 1,
                           Name = "Test User A"
                        },
                        Receiver = new User {
                           Id = 2,
                           Name = "Test User B"
                        },
                        CreatedDate = DateTime.Now,
                        Content = "Hello User B"
                    },
                    new Message
                    {
                        Id = 2,
                        Sender = new User {
                           Id = 2,
                           Name = "Test User B"
                        },
                        Receiver = new User {
                           Id = 1,
                           Name = "Test User A"
                        },
                        CreatedDate = DateTime.Now,
                        Content = "Hello User A"
                    }
                    
                });
            var messageController = new MessageController(_messageRepositoryMock.Object, _userRepositoryMock.Object,  _mapper);
            // Act
            var conversation = await messageController.GetConversation(1,2);
            // Assert
            Assert.AreEqual(2, conversation.Messages.Count );

        }
    }

}
