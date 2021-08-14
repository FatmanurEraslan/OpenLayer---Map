using MapDemo.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace MapDemo.Concrete

{
    public class ProjectContext: DbContext
    {
        public ProjectContext(): base("name=ProjectContext")
        {

        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            Database.SetInitializer<ProjectContext>(null);
            base.OnModelCreating(modelBuilder);
        }

    }
}