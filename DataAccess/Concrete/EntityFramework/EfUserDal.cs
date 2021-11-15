using DataAccess.Abstract;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;

namespace DataAccess.Concrete.EntityFramework
{
    public class EfUserDal : IUserDal
    {
        public void Add(User entity)
        {
            //IDisposable pattern implamentation c#
            //is bitince bellegi temizle
            using (NorthwindContext context = new NorthwindContext())
            {
                var addedEntity = context.Entry(entity);
                addedEntity.State = EntityState.Added;
                context.SaveChanges();
            }
        }

        public void Delete(User entity)
        {
            using (NorthwindContext context = new NorthwindContext())
            {
                var deletedEntity = context.Entry(entity);
                deletedEntity.State = EntityState.Deleted;
                context.SaveChanges();
            }            
        }
        public void Update(User entity)
        {
            using (NorthwindContext context = new NorthwindContext())
            {
                var updatedEntity = context.Entry(entity);
                updatedEntity.State = EntityState.Modified;
                context.SaveChanges();
            }
        }
        public List<User> GetAll(Expression<Func<User, bool>> filter = null)
        {
            using (NorthwindContext context = new NorthwindContext())
            {
                return filter == null 
                    ? context.Set<User>().ToList()
                    : context.Set<User>().Where(filter).ToList(); 
            }
        }
        public User Get(Expression<Func<User, bool>> filter)
        {
            using (NorthwindContext context = new NorthwindContext())
            {
                return context.Set<User>().SingleOrDefault(filter);
            }
        }

        public User GetUserById(Expression<Func<User, bool>> filter)
        {
            using (NorthwindContext context = new NorthwindContext())
            {
                return context.Set<User>().SingleOrDefault(filter);
            }
        }
    }
}
