using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using server.Data;
using server.Models;

namespace VisconTicketsTests.Issues
{
  public class DataIssueTests
  {
    private readonly IDataIssue _dataIssue;
    private readonly Mock<DataContext> _mockContext;
    private readonly Mock<IMapper> _mockMapper;

    public DataIssueTests()
    {
        _mockContext = new Mock<DataContext>();
        _mockMapper = new Mock<IMapper>();
        _dataIssue = new DataIssue(_mockContext.Object, _mockMapper.Object);
    }

    [Fact]
    public async Task GetIssues_Successful()
    {
      // Arrange
      var machineId = Guid.NewGuid();
      var issues = new List<Issue>
            {
                new Issue { Id = Guid.NewGuid(), Description = "Test issue 1", MachineId = machineId },
                new Issue { Id = Guid.NewGuid(), Description = "Test issue 2", MachineId = machineId }
            };

      // Act
      var result = await _dataIssue.GetIssues(machineId);

      // Assert
      Assert.Equal(2, result.Count);
      Assert.Equal(issues[0].Id, result[0].Id);
      Assert.Equal(issues[0].Description, result[0].Description);
      Assert.Equal(issues[1].Id, result[1].Id);
      Assert.Equal(issues[1].Description, result[1].Description);
    }
  }
}