using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace MapDemo.Models
{
    [Table("User")]
    public class User
    {
        public int ID { get; set; }
      
        public string Name { get; set; }

        public int Number { get; set; }

        public double? X { get; set; }

        public double? Y{ get; set; }

    }
}