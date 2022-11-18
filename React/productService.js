import axios from "axios";
import { API_HOST_PREFIX, onGlobalError, onGlobalSuccess } from "./serviceHelpers";

const productService = {
  endpoint: `${API_HOST_PREFIX}/api/products/`,
};

  const getProducts = (pageIndex, pageSize)  => {
    const config = {
      method: "GET",
      url: `${productService.endpoint}paginate?pageIndex=${pageIndex}&pageSize=${pageSize}`,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const getBy = (id)  => {
    const config = {
      method: "GET",
      url: productService.endpoint + id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const deleteProduct = (id)  => {
    const config = {
      method: "DELETE",
      url: productService.endpoint + id,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const addProduct = (payload) => {
      const config = {
        method: "POST",
        url: productService.endpoint,
        data: payload,
        withCredentials: true,
        crossdomain: true,
        headers: { "Content-Type": "application/json" },
      };
      return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

  const updateProduct = (id, payload)  => {
    const config = {    
      method: "PUT",
      url: productService.endpoint + id,
      data: payload,
      withCredentials: true,
      crossdomain: true,
      headers: { "Content-Type": "application/json" }
    };
    return axios(config).then(onGlobalSuccess).catch(onGlobalError);
  };

const searchCreatedBy = (pageIndex, pageSize, searchQuery)  => {
  const config = {
    method: "GET",
    url: `${productService.endpoint}createdby?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${searchQuery}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchQuery = (searchQuery, pageIndex, pageSize)  => {
  const config = {
    method: "GET",
    url: `${productService.endpoint}search?pageIndex=${pageIndex}&pageSize=${pageSize}&query=${searchQuery}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchByVendor = (pageIndex, pageSize, vendorName)  => {
  const config = {
    method: "GET",
    url: `${productService.endpoint}vendor?pageIndex=${pageIndex}&pageSize=${pageSize}&vendorName=${vendorName}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchByType = (pageIndex, pageSize, typeId)  => {
  const config = {
    method: "GET",
    url: `${productService.endpoint}type/${typeId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const searchByVendorByType = (pageIndex, pageSize, vendorId, productTypeId)  => {
  const config = {
    method: "GET",
    url: `${productService.endpoint}vendor/${vendorId}/type/${productTypeId}?pageIndex=${pageIndex}&pageSize=${pageSize}`,
    withCredentials: true,
    crossdomain: true,
    headers: { "Content-Type": "application/json" }
  };
  return axios(config).then(onGlobalSuccess).catch(onGlobalError);
};

const productServices = { 
  getProducts,
  getBy, 
  deleteProduct,
  addProduct, 
  updateProduct, 
  searchCreatedBy, 
  searchQuery, 
  searchByVendor, 
  searchByType,
  searchByVendorByType 
}

export default productServices;