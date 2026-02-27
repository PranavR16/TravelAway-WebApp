using System.Collections.Generic;

namespace TravelAway.DAL.Models
{
    public partial class Package
    {
        public Package()
        {
            BookPackage = new HashSet<BookPackage>();
            Hotel = new HashSet<Hotel>();
            PackageDetails = new HashSet<PackageDetails>();
        }

        public int PackageId { get; set; }
        public string PackageName { get; set; }
        public int? PackageCategoryId { get; set; }
        public string TypeOfPackage { get; set; }
        public string ImagePath { get; set; }

        public string Description { get; set; }

        public virtual PackageCategory PackageCategory { get; set; }
        public virtual ICollection<BookPackage> BookPackage { get; set; }
        public virtual ICollection<Hotel> Hotel { get; set; }
        public virtual ICollection<PackageDetails> PackageDetails { get; set; }
    }
}
