using Xunit;
using server.Controllers;
using Microsoft.AspNetCore.Mvc;
using server.Services.UserService;
using Moq;

namespace server
{
    public class TestClass
    {
        [Fact]
        public void TestAddUser()
        {
            // Arrange
            var mockUserService = new Mock<IUserService>();
            var mockServiceResponse = new ServiceResponse<AddUserDTO>
            {
                Data = null,
                Success = true,
                Message = "User added successfully."
            };
            mockUserService.Setup(service => service.AddUser(It.IsAny<AddUserDTO>()))
                .Returns(Task.FromResult(mockServiceResponse));
            var controller = new UserController(mockUserService.Object);

            // Act
            var mockNewUser = new AddUserDTO
            {
                FirstName = "John",
                LastName = "Doe",
                Email = "johndoe@gmail.com",
                Role = Role.CustomerAdmin,
                CompanyId = Guid.NewGuid()
            };
            var result = controller.AddUser(mockNewUser);

            // Assert
            Assert.IsType<OkObjectResult>(result.Result);
            Assert.Equal(mockServiceResponse, ((OkObjectResult)result.Result).Value);
        }

        // [Fact]
        // public void TestEmailExists()
        // {
        //     // Arrange
        //     var mockUserService = new Mock<IUserService>();
        //     var mockServiceResponse = new ServiceResponse<bool>
        //     {
        //         Data = true,
        //         Success = true,
        //         Message = "Email already exists."
        //     };
        //     mockUserService.Setup(service => service.EmailExists(It.IsAny<string>()))
        //         .Returns(Task.FromResult(mockServiceResponse));
        //     var controller = new UserController(mockUserService.Object);

        //     // Act
        //     var result = controller.EmailExists("fdfgdfg@gmail.com");

        //     // Assert
        //     Assert.IsType<OkObjectResult>(result.Result);
        //     Assert.Equal(mockServiceResponse, ((OkObjectResult)result.Result).Value);
        // }
    }
}