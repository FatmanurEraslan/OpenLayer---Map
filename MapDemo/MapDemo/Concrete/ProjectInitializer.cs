using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data.Entity;
using MapDemo.Concrete;
using MapDemo.Models;

namespace Mapdemo.Concrete

{

    public class ProjectInitializer : DropCreateDatabaseIfModelChanges<ProjectContext>
    {
        protected override void Seed(ProjectContext context)
        {
            var users = new List<User>
            {
            new User{Name="Fatma",Number=44}
            };

            users.ForEach(s => context.Users.Add(s));
            context.SaveChanges();

        }

    }
}