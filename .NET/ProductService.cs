using Sabio.Data;
using Sabio.Data.Providers;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Domain.Products;
using Sabio.Models.Domain.Vendors;
using Sabio.Models.Requests.Products;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sabio.Services
{
    public class ProductService : IProductService
    {
        IDataProvider _data = null;

        public ProductService(IDataProvider data)
        {
            _data = data;
        }

        #region --- GETS ---
        public Product GetProductById(int id)
        {
            string procName = "dbo.Products_Select_ById";
            Product product = null;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@Id", id);
                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;
                    product = MapSingleProduct(reader, ref startingIndex);
                });

            return product;
        }

        public Paged<Product> GetProducts(int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Products_Select_All]";
            Paged<Product> pagedList = null;
            List<Product> productList = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);

                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Product product = MapSingleProduct(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (productList == null)
                    {
                        productList = new List<Product>();
                    }
                    productList.Add(product);


                });

            if (productList != null)
            {
                pagedList = new Paged<Product>(productList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Product> GetProductsByCreatedBy(int userId, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Products_Select_ByCreatedBy]";
            Paged<Product> pagedList = null;
            List<Product> productList = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@UserId", userId);
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);

                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Product product = MapSingleProduct(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (productList == null)
                    {
                        productList = new List<Product>();
                    }
                    productList.Add(product);


                });

            if (productList != null)
            {
                pagedList = new Paged<Product>(productList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Product> GetProductsSearch(string searchTerm, int pageIndex, int pageSize)
        {
            string procName = "[dbo].[Products_Select_BySearch]";
            Paged<Product> pagedList = null;
            List<Product> productList = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@SearchTerm", searchTerm);
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);

                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Product product = MapSingleProduct(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (productList == null)
                    {
                        productList = new List<Product>();
                    }
                    productList.Add(product);


                });

            if (productList != null)
            {
                pagedList = new Paged<Product>(productList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Product> GetProductsByVendor(int pageIndex, int pageSize, string vendorName)
        {
            string procName = "[dbo].[Products_Select_All_ByVendor]";
            Paged<Product> pagedList = null;
            List<Product> productList = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@VendorName", vendorName);

                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Product product = MapSingleProduct(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (productList == null)
                    {
                        productList = new List<Product>();
                    }
                    productList.Add(product);
                });

            if (productList != null)
            {
                pagedList = new Paged<Product>(productList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Product> GetProductsByType(int pageIndex, int pageSize, int productTypeId)
        {
            string procName = "[dbo].[Products_Select_All_ByType]";
            Paged<Product> pagedList = null;
            List<Product> productList = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@ProductType", productTypeId);

                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Product product = MapSingleProduct(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (productList == null)
                    {
                        productList = new List<Product>();
                    }
                    productList.Add(product);
                });

            if (productList != null)
            {
                pagedList = new Paged<Product>(productList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }

        public Paged<Product> GetProductsByVendorProductType(int pageIndex, int pageSize, int vendorId, int productTypeId)
        {
            string procName = "[dbo].[Products_Select_All_ByVendor_ProductType]";
            Paged<Product> pagedList = null;
            List<Product> productList = null;
            int totalCount = 0;

            _data.ExecuteCmd(procName,
                inputParamMapper: delegate (SqlParameterCollection col)
                {
                    col.AddWithValue("@PageIndex", pageIndex);
                    col.AddWithValue("@PageSize", pageSize);
                    col.AddWithValue("@VendorId", vendorId);
                    col.AddWithValue("@ProductTypeId", productTypeId);

                }, delegate (IDataReader reader, short set)
                {
                    int startingIndex = 0;

                    Product product = MapSingleProduct(reader, ref startingIndex);
                    if (totalCount == 0)
                    {
                        totalCount = reader.GetSafeInt32(startingIndex++);
                    }
                    if (productList == null)
                    {
                        productList = new List<Product>();
                    }
                    productList.Add(product);


                });

            if (productList != null)
            {
                pagedList = new Paged<Product>(productList, pageIndex, pageSize, totalCount);
            }
            return pagedList;
        }
        #endregion

        #region --- POST & PUT ---
        public int AddProduct(ProductAddRequest model, int userId)
        {
            int id = 0;

            string procName = "[dbo].[Products_Insert]";

            _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@IsActive", true);
                col.AddWithValue("@UserId", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);

            }
            , returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;

                int.TryParse(oId.ToString(), out id);

            });

            return id;
        }

        public void UpdateProduct(ProductUpdateRequest model, int userId)
        {
            string procName = "[dbo].[Products_Update]";
            _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@UserId", userId);
                col.AddWithValue("@Id", model.Id);
            }
            , returnParameters: null);
        }
        #endregion

        #region --- DELETE ---
        public void DeleteProduct(int id, int userId)
        {
            string procName = "[dbo].[Products_Delete]";
            _data.ExecuteNonQuery(procName
            , inputParamMapper: delegate (SqlParameterCollection col)
            {
                col.AddWithValue("@Id", id);
                col.AddWithValue("@UserId", userId);
            }
            , returnParameters: null);
        }
        #endregion

        private static Product MapSingleProduct(IDataReader reader, ref int startingIndex)
        {
            Product product = new Product();
            product.ProductType = new LookUp();
            product.Vendor = new SimpleVendor();

            product.Id = reader.GetSafeInt32(startingIndex++);
            product.SKU = reader.GetSafeString(startingIndex++);
            product.Name = reader.GetSafeString(startingIndex++);
            product.Manufacturer = reader.GetSafeString(startingIndex++);
            product.Year = reader.GetSafeInt32(startingIndex++);
            product.Description = reader.GetSafeString(startingIndex++);
            product.Specifications = reader.GetSafeString(startingIndex++);
            product.ProductType.Id = reader.GetSafeInt32(startingIndex++);
            product.ProductType.Name = reader.GetSafeString(startingIndex++);
            product.Vendor.Id = reader.GetSafeInt32(startingIndex++);
            product.Vendor.Name = reader.GetSafeString(startingIndex++);
            product.Vendor.Description = reader.GetSafeString(startingIndex++);
            product.Vendor.Headline = reader.GetSafeString(startingIndex++);
            product.IsVisible = reader.GetSafeBool(startingIndex++);
            product.IsActive = reader.GetSafeBool(startingIndex++);
            product.PrimaryImage = reader.GetSafeString(startingIndex++);
            product.DateCreated = reader.GetSafeDateTime(startingIndex++);
            product.DateModified = reader.GetSafeDateTime(startingIndex++);
            product.CreatedBy = reader.GetSafeInt32(startingIndex++);
            product.ModifiedBy = reader.GetSafeInt32(startingIndex++);

            return product;
        }

        private static void AddCommonParams(ProductAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@SKU", model.SKU);
            col.AddWithValue("@Name", model.Name);
            col.AddWithValue("@Manufacturer", model.Manufacturer);
            col.AddWithValue("@Year", model.Year);
            col.AddWithValue("@Description", model.Description);
            col.AddWithValue("@Specifications", model.Specifications);
            col.AddWithValue("@ProductTypeId", model.ProductTypeId);
            col.AddWithValue("@VendorId", model.VendorId);
            col.AddWithValue("@IsVisible", model.IsVisible);
            col.AddWithValue("@PrimaryImage", model.PrimaryImage);
        }
    }
}
