using System;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace Locu_Test_App.Models
{
    public class SettingBindingModels
    {

    }
    public class SetLocationBindingModel
    {
        [Display(Name = "Address Line 1")]
        public string Address { get; set; }

        public string City { get; set; }

        public string State { get; set; }

        public string postal_code { get; set; }

       }
}