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
    public class UserControllerTest
    {
        private IMapper _mapper;
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

            _userRepositoryMock = new Mock<IGenericRepository<User>>();
        }

        [TestMethod]
        public async Task ShouldGetAllUserFromControllerAsync()
        {
            // Arrange


            _userRepositoryMock.Setup(x => x.ListAllAsync())
                .ReturnsAsync(new List<User>
                {
                    new User
                    {
                        Id = 1,
                        Name = "Hello World 1",
                    },
                    new User
                    {
                        Id = 2,
                        Name = "Hello World 2",
                    },
                    new User
                    {
                        Id = 2,
                        Name = "Hello World 3",
                    }
                });
            var userController = new UserController(_mapper, _userRepositoryMock.Object);

            // Act
            var users = await userController.Get();

            // Assert
            Assert.AreEqual(3, users.Users.Count);

        }

        [TestMethod]
        public async Task CreateUser_ShouldCreateANewUser()
        {
            // Arrange
            var spec = new UserFilter_GetUserName(It.IsAny<string>());
            _userRepositoryMock.Setup(x => x.CreateAsync(It.IsAny<User>()))
                .ReturnsAsync(1);
            var userController = new UserController(_mapper, _userRepositoryMock.Object);

            // Act
            var users = await userController.CreateUser("Test User");
            var result = users.Result as OkObjectResult;
            // Assert
            Assert.AreEqual("user created", result.Value);
        }

        [TestMethod]
        public async Task CreateUser_ShouldFailIfUserExist()
        {
            // Arrange
            _userRepositoryMock.Setup(x => x.GetPropWithSpec(It.IsAny<ISpecification<User>>()))
                .ReturnsAsync(new User { Id = 1, Name = "Test User" });
            var userController = new UserController(_mapper, _userRepositoryMock.Object);

            // Act
            var users = await userController.CreateUser("Test User");
            var result = users.Result as BadRequestObjectResult;
            // Assert
            Assert.AreEqual("User already exists", result.Value);
        }
    }
}
