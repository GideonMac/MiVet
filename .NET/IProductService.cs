using Sabio.Models;
using Sabio.Models.Domain.Products;
using Sabio.Models.Requests.Products;

namespace Sabio.Services
{
    public interface IProductService
    {
        int AddProduct(ProductAddRequest model, int userId);
        void DeleteProduct(int id, int userId);
        Product GetProductById(int id);
        Paged<Product> GetProducts(int pageIndex, int pageSize);
        Paged<Product> GetProductsByCreatedBy(int id, int pageIndex, int pageSize);
        Paged<Product> GetProductsByType(int pageIndex, int pageSize, int productTypeId);
        Paged<Product> GetProductsByVendor(int pageIndex, int pageSize, string vendorName);
        Paged<Product> GetProductsByVendorProductType(int pageIndex, int pageSize, int vendorId, int productTypeId);
        Paged<Product> GetProductsSearch(string query, int pageIndex, int pageSize);
        void UpdateProduct(ProductUpdateRequest model, int userId);
    }
}