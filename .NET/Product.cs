using Sabio.Models.Domain.Vendors;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Models.Domain.Products
{
    public class Product
    {
        public int Id { get; set; }
        public string SKU { get; set; }
        public string Name { get; set; }
        public string Manufacturer { get; set; }
        public int Year { get; set; }
        public string Description { get; set; }
        public string Specifications { get; set; }
        public LookUp ProductType { get; set; }
        public SimpleVendor Vendor { get; set; }
        public bool IsVisible { get; set; }
        public bool IsActive { get; set; }
        public string PrimaryImage { get; set; }
        public DateTime DateCreated { get; set; }
        public DateTime DateModified { get; set; }
        public int CreatedBy { get; set; }
        public int ModifiedBy { get; set; }

    }
}
                                                          