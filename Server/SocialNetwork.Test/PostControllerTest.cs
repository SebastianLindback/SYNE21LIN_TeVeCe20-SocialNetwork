using AutoMapper;
using Moq;
using SocialNetwork.Api.Controllers;
using SocialNetwork.Entity;
using API.Helpers;
using Entity.Interfaces;

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
            // Arrange
            _postRepositoryMock.Setup(x => x.GetByIdAsync(1))
                .ReturnsAsync(new Post
                {
                    Id = 1,
                    CreatedDate = DateTime.Now,
                    Message = "Hello World",
                });

            // Act
            var postController = new PostController(_postRepositoryMock.Object, _mapper, _userRepositoryMock.Object);
            var postDto = await postController.Get(1);

            // Assert
            Assert.AreEqual(1, postDto.Posts.Count);

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
