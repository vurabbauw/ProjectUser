using Business.Abstract;
using Business.Utilities.Result;
using DataAccess.Abstract;
using Entities.Concrete;
using System;
using System.Collections.Generic;
using System.Text;

namespace Business.Concrete
{
    public class UserManager : IUserService
    {
        IUserDal _userDal;

        public UserManager(IUserDal userDal)
        {
            _userDal = userDal;
        }

        public IResult Add(User user)
        {
            _userDal.Add(user);
            return new Result(true, "User ADDED With Successfully");
        }
        public IResult Update(User user)
        {
            _userDal.Update(user);
            return new Result(true, "User UPDATED With Successfully");
        }
        public IResult Delete(User user)
        {
            _userDal.Delete(user);
            return new Result(true, "User DELETED With Successfully");
        }
        public List<User> GetAll()
        {
            return _userDal.GetAll();
        }

        public User GetAllByUserFirstNameOrUserLastName(string userFirstName)
        {
            return _userDal.Get(u => u.UserFirstName == userFirstName);
        }

        public User GetUserById(int userId)
        {
            return _userDal.GetUserById(u => u.UserId == userId);
        }
        
    }
}
