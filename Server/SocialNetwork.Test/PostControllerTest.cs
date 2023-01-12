using System.IO.Compression;
using AutoMapper;
using Moq;
using SocialNetwork.Api.Controllers;
using SocialNetwork.Entity;
using API.Helpers;
using Entity.Interfaces;
using SocialNetwork.Api.Dto;
using SocialNetwork.Entity.Specification;

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
        public async Task Get_ShouldGetPostsToUser()
        {
            var inputId = 1;
            _postRepositoryMock.Setup(x => x.ListWithSpec(It.IsAny<ISpecification<Post>>()))
                .ReturnsAsync(new List<Post>{
                    new Post
                    {
                        Id = 5,
                        CreatedDate = DateTime.Now,
                        Message = "Hello World",
                        ReceiverId = inputId
                    }}
                );
            var postController = new PostController(_postRepositoryMock.Object, _mapper, _userRepositoryMock.Object);
            
            // Act
            var post = await postController.Get(inputId);

            // Assert
            Assert.AreEqual(inputId, post.Posts.Where( x => x.ReceiverId == inputId).FirstOrDefault()!.ReceiverId);

        }

        [TestMethod]
        public async Task GetPostsFromUsers_ShouldGetPostsFromsUser()
        {
            int[] inputIds = new int[]{1};
            _postRepositoryMock.Setup(x => x.ListWithSpec(It.IsAny<ISpecification<Post>>()))
                .ReturnsAsync(new List<Post>{
                    new Post
                    {
                        Id = 5,
                        CreatedDate = DateTime.Now,
                        Message = "Hello World",
                        SenderId = inputIds[0]
                    }}
                );
            var postController = new PostController(_postRepositoryMock.Object, _mapper, _userRepositoryMock.Object);
            
            // Act
            var post = await postController.GetPostsFromUsers(inputIds);

            // Assert
            Assert.AreEqual(inputIds.Count(), post.Posts.Where( x => inputIds.Contains(x.SenderId)).Count());

        }

        [TestMethod]
        public async Task Get_ShouldGetAllPostFromControllerAsync()
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
                        Id = 3,
                        CreatedDate = DateTime.Now,
                        Message = "Hello World 3",
                    }
                });
            _userRepositoryMock.Setup(x => x.GetByIdAsync(It.IsAny<int>()))
            .ReturnsAsync(
                new User {
                    Id = 1,
                    Name= "asd"
                }
            );
            var postController = new PostController(genericRepository.Object, _mapper, _userRepositoryMock.Object);
            
            // Act
            var posts = await postController.Get();

            // Assert
            Assert.AreEqual(3, posts.Posts.Count);

        }

        [TestMethod]
        public async Task Post_ShouldAddPostToDB()
        {
            // Arrange
            var postController = new PostController(_postRepositoryMock.Object, _mapper, _userRepositoryMock.Object);
            
            var post = new PostDto {
                SenderId = 1,
                ReceiverId = 2,
                Message = "3"
            };

            // Act
            var _sup = await postController.Post(post);
            // Assert
            Assert.AreEqual(post.Message, _sup.Message);


        }
    }
}
