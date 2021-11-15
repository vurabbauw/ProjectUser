using System;
using System.Collections.Generic;
using System.Text;
using Entities.Concrete;
using Microsoft.EntityFrameworkCore;

namespace DataAccess.Concrete.EntityFramework
{
    //db tabloları ile proje classlarını bglamak
    public class NorthwindContext:DbContext
    {
        //Proje hangi veritabani ile iliskili
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer(@"Server=DESKTOP-TIIVC7J\mssqlserver_2019;Database=NORTHWND;Trusted_Connection=true"); 
        }

        public DbSet<User> UsersBB { get; set; }
    }
}
