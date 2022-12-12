using AutoMapper;
using Moq;
using SocialNetwork.Api.Controllers;
using SocialNetwork.Entity;
using API.Helpers;
using Entity.Interfaces;
using SocialNetwork.Api.Dto;

namespace SocialNetwork.Test
{
    [TestClass]
    public class PostControllerTest
    {
        private IMapper _mapper;
        private Mock<IGenericRepository<Post>> _postRepositoryMock;
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

            _postRepositoryMock = new Mock<IGenericRepository<Post>>();
            _userRepositoryMock = new Mock<IGenericRepository<User>>();
        }

        [TestMethod]
        public async Task ShouldGetOnePostFromController()
        {
            var inputId = 1;
            _postRepositoryMock.Setup(x => x.GetByIdAsync(inputId))
                .ReturnsAsync(
                    new Post
                    {
                        Id = inputId,
                        CreatedDate = DateTime.Now,
                        Message = "Hello World",
                    }
                );
            var postController = new PostController(_postRepositoryMock.Object, _mapper, _userRepositoryMock.Object);
            
            // Act
            var post = await postController.Get(userId: inputId);

            // Assert
            Assert.AreEqual(inputId, post.Id);

        }

        [TestMethod]
        public async Task ShouldGetAllPostFromControllerAsync()
        {
            // Arrange
            var genericRepository = new Mock<IGenericRepository<Post>>();
            
            genericRepository.Setup(x => x.ListAllAsync())
                .ReturnsAsync(new List<Post>
                {
                    new Post
                    {
                        Id = 1,
                        CreatedDate = DateTime.Now,
                        Message = "Hello World 1",
                    },
                    new Post
                    {
                        Id = 2,
                        CreatedDate = DateTime.Now,
                        Message = "Hello World 2",
                    },
                    new Post
                    {
                        Id = 2,
                        CreatedDate = DateTime.Now,
                        Message = "Hello World 3",
                    }
                });
            var postController = new PostController(genericRepository.Object, _mapper, _userRepositoryMock.Object);
            
            // Act
            var posts = await postController.Get();

            // Assert
            Assert.AreEqual(3, posts.Posts.Count);

        }
    }
}
