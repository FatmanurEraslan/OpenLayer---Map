using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using MapDemo.Models;
using System.Data;
using System.Configuration;
using MapDemo.Concrete;

namespace MapDemo.Controllers
{
    public class HomeController : Controller
    {
        ProjectContext db = new ProjectContext();
        public ActionResult Index()
        {
            return View();
        }
        public JsonResult SavePoint()
        {
            return Json("");
        }
        [HttpGet]
        public JsonResult List()
        {
            return Json(db.Users.ToList(), JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public JsonResult SavePoint(User user, float x, float y, string name, int number)
        {
            if (ModelState.IsValid)
            {
                user.Name = name;
                user.Number = number;
                user.X = x;
                user.Y = y;
                db.Users.Add(user);
                db.SaveChanges();
            }
            return Json("");
        }

        [HttpPost]
        public JsonResult PointInformation(int? id, string type)
        {

            if (id == null)
            {
                return Json(new { hata = "ID Information Not Sent." });
            }

            if (type == "Name")
            {
               User user = db.Users.Find(id);

               if (user == null)
                {
                   
                    return Json(new { hata = "No Information Found." });
                }
               else
                {
                    return Json(new { _Info = user });
                }

            }

            return Json(new { _Info = "" });
        }
      

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
       

    }
}