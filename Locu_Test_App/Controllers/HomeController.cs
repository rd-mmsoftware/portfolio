using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using Locu_Test_App.Models;

namespace Locu_Test_App.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Menu(string Id)
        {
            return View(model: new VenueDataModel { VenueId = Id });
        }
    }
}
