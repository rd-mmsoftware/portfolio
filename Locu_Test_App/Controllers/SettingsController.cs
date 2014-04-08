using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.ModelBinding;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.EntityFramework;
using Locu_Test_App.Models;
using Locu_Test_App.Results;

namespace Locu_Test_App.Controllers
{
    public class SettingsController : ApiController
    {

        // POST api/Settings/SetLocation
        [Route("SetLocation")]
        public async Task<IHttpActionResult> SetLocation(SetLocationBindingModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           

           

            return Ok("acd");
        }
    }
}
