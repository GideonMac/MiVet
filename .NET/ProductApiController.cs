using Amazon.Runtime.Internal.Util;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain.Products;
using Sabio.Models.Requests.Products;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;
using System;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductApiController : BaseApiController
    {
        private IProductService _service = null;
        private IAuthenticationService<int> _authService = null;

        public ProductApiController(IProductService service, 
            IAuthenticationService<int> authService,
            ILogger<ProductApiController> logger) : base(logger)
        {
            _service = service;
            _authService = authService;
        }

        #region --- GETS ---
        [HttpGet("{id:int}")]
        public ActionResult<ItemResponse<Product>> GetById(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Product course = _service.GetProductById(id);

                if (course == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("Application resource not found.");
                }
                else
                {
                    response = new ItemResponse<Product>() { Item = course };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                base.Logger.LogError(ex.ToString());
                response = new ErrorResponse($"Generic Error: {ex.Message}");
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("paginate")]
        public ActionResult<ItemResponse<Paged<Product>>> GetAllPaginated(int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Product> page = _service.GetProducts(pageIndex, pageSize);

                if (page == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Product>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("paginate/byuser")]
        public ActionResult<ItemResponse<Paged<Product>>> GetByCreatedBy(int pageIndex, int pageSize, int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Product> page = _service.GetProductsByCreatedBy(id, pageIndex, pageSize);

                if (page == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Product>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("search")]
        public ActionResult<ItemResponse<Paged<Product>>> GetSearchPaginated(string query, int pageIndex, int pageSize)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Product> page = _service.GetProductsSearch(query, pageIndex, pageSize);

                if (page == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Product>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("vendor")]
        public ActionResult<ItemResponse<Paged<Product>>> GetByVendor(int pageIndex, int pageSize, string vendorName)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Product> page = _service.GetProductsByVendor(pageIndex, pageSize, vendorName);

                if (page == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Product>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("type/{typeId:int}")]
        public ActionResult<ItemResponse<Paged<Product>>> GetByType(int pageIndex, int pageSize, int typeId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Product> page = _service.GetProductsByType(pageIndex, pageSize, typeId);

                if (page == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Product>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }

        [HttpGet("vendor/{vendorId:int}/type/{productTypeId:int}")]
        public ActionResult<ItemResponse<Paged<Product>>> GetByVendorProductType(int pageIndex, int pageSize, int vendorId, int productTypeId)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                Paged<Product> page = _service.GetProductsByVendorProductType(pageIndex, pageSize, vendorId, productTypeId);

                if (page == null)
                {
                    iCode = 404;
                    response = new ErrorResponse("App Resource not found.");
                }
                else
                {
                    response = new ItemResponse<Paged<Product>> { Item = page };
                }
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
                base.Logger.LogError(ex.ToString());
            }

            return StatusCode(iCode, response);
        }
        #endregion

        #region --- POST & PUT ---
        [HttpPost]
        public ActionResult<ItemResponse<int>> Create(ProductAddRequest model)
        {
            ObjectResult result = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                int newId = _service.AddProduct(model, userId);

                ItemResponse<int> response = new ItemResponse<int>() { Item = newId };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                base.Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

        [HttpPut("{id:int}")]
        public ActionResult<ItemResponse<int>> Update(ProductUpdateRequest model)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();

                _service.UpdateProduct(model, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }
        #endregion

        [HttpDelete("{id:int}")]
        public ActionResult<SuccessResponse> Delete(int id)
        {
            int iCode = 200;
            BaseResponse response = null;

            try
            {
                int userId = _authService.GetCurrentUserId();
                _service.DeleteProduct(id, userId);

                response = new SuccessResponse();
            }
            catch (Exception ex)
            {
                iCode = 500;
                response = new ErrorResponse(ex.Message);
            }

            return StatusCode(iCode, response);
        }
    }
}
