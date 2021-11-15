using Business.Abstract;
using Business.Concrete;
using DataAccess.Concrete.EntityFramework;
using Entities.Concrete;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using Business.Utilities.Result;

namespace WebAPI.Controllers
{
    //[ApiController]
    //[Route("api/[controller]")]

    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        public IUserService _userService;
        //  private readonly IConfiguration _configuraiton;

        public UsersController(IUserService userService)
        {
            _userService = userService;
            //  _configuraiton = configuration;
        }

        [HttpGet]
        public List<User> GetAllUsers()
        {
            return _userService.GetAll();
        }

        [HttpGet("{userId}")]
        public User GetUserById(int userId)
        {
            return _userService.GetUserById(userId);
        }

        [HttpPost]
        public IActionResult Post([FromBody] User user)
        {
            var result = _userService.Add(user);
            if (result.Success)
            {
                return Ok(result);
            }
            else
            {
                return null;
            }
        }

        [HttpPut]
        public IResult Put([FromBody] User user)
        {
            return _userService.Update(user);
        }

        [HttpDelete("{userId}")]
        public IResult Delete([FromBody] User user)
        {
            return _userService.Delete(user);
        }
    }
}
