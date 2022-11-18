import React, {useState, useEffect, useCallback } from "react";
import debug from "sabio-debug";
import 'rc-pagination/assets/index.css';
import locale from "rc-pagination/lib/locale/en_US"; 
import Pagination from 'rc-pagination';
import Product from "./Product";
import productService from "../../services/productService";
import {Link, useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import toastr from "toastr";
import "../../toastr/build/toastr.css"
import { Button, Col, OverlayTrigger, Row, Tab, Tooltip } from "react-bootstrap";
import ProductCollapse from "./ProductCollapse";

const _logger = debug.extend("Products");

function Products(props) {
   const [pageData, setPageData] = useState(
      {
         arrayOfProducts: []
         , productComponents: []
         , pageIndex: 0
         , pageSize: 12
         , totalCount: 0
         , initialIndex: 0
         , initialSize: 0
         , initialCount: 0
      });

   let navigate = useNavigate();   

   useEffect(() => {
      pageData.searchQuery  ?
      productService.searchQuery(pageData.searchQuery, pageData.pageIndex, pageData.pageSize)
      .then(onSearchSuccess)
      .catch(onSearchError)
      :
      pageData.typeInfo && pageData.vendorInfo ?
      productService.searchByVendorByType(pageData.pageIndex, pageData.pageSize, pageData.vendorInfo.id, pageData.typeInfo.id)
      .then(onGetFilteredProductsSuccess)
      .catch(onGetFilteredProductsError)
      :
      pageData.typeInfo && !pageData.vendorInfo ?
      productService.searchByType(pageData.pageIndex, pageData.pageSize, pageData.typeInfo.id)
      .then(onGetFilteredProductsSuccess)
      .catch(onGetFilteredProductsError)
      :
      pageData.vendorInfo && !pageData.typeInfo ?
      productService.searchByVendor(pageData.pageIndex, pageData.pageSize, pageData.vendorInfo.name)
      .then(onGetFilteredProductsSuccess)
      .catch(onGetFilteredProductsError)
      :
      productService.getProducts(pageData.pageIndex, pageData.pageSize)
      .then(onGetProductsSuccess)
      .catch(onGetProductsError);
   },[pageData.pageIndex]);    

   const onGetProductsSuccess = (response) => {
      _logger("GET PAGINATED", response);
     let productsArray = response.item.pagedItems;

     setPageData((prevState)=>{
      const pd = {...prevState};
      pd.arrayOfProducts = productsArray;
      pd.productComponents = productsArray.map(mapProduct);

      pd.pageIndex = response.item.pageIndex;
      pd.totalCount = response.item.totalCount;
      pd.pageSize = response.item.pageSize;

      pd.initialCount = response.item.totalCount;
      pd.initialSize = response.item.pageSize;

      return pd;
     }
     )
  }

   const mapProduct = (aProduct) => {
      return (
            <Product 
            product={aProduct} 
            key={`ListP-` + aProduct.id} 
            onProductDeleteClicked={onDeleteRequested}
            onProductEditClicked={onEditRequested} 
            currentRoles={props.currentUser}
            />
      );
   }

   const onDeleteRequested = useCallback((myProduct, eObj) => {
      _logger("Deleted-", myProduct.id, { myProduct, eObj })
     
      const handler = getDeleteSuccessHandler(myProduct.id);
      
      productService.deleteProduct(myProduct.id).then(handler).catch(onDeleteError);

  }, []);

  const getDeleteSuccessHandler = (idToBeDeleted) => {

      return () => {
          _logger("onDeleteSuccess", idToBeDeleted);
  
          setPageData(prevState=>{
              const pd = {...prevState};
  
              const idxOf = pd.arrayOfProducts.findIndex(product=>{
  
                  let result = false;
  
                  if(product.id === idToBeDeleted) {
                      result = true;
                  }
  
                  return result
              })
  
              if(idxOf >= 0) {
                  pd.arrayOfProducts.splice(idxOf, 1);
                  pd.productComponents = pd.arrayOfProducts.map(mapProduct);
              }
  
              return pd;
          })
      }
  }

  const onEditRequested = (aProduct)=> {
   _logger(aProduct)
   navigate(`/products/${aProduct.id}/edit`, {state:aProduct})
}

   const onPageChange = (page) => {
      _logger("Page-", page);
   
      setPageData((prevState)=> {
            let pd = {...prevState};
            pd.pageIndex = page - 1;
            
            return pd;
      })
   }    

   const onAddClicked = (e) => {
      e.preventDefault();
      navigate("new");
  }

   const onGetProductsError = (err) => {
      _logger("Paginated Fail", err);
  }   

   const onDeleteError = (err) => {
      _logger(err);
      toastr.error("Product was not deleted", "Delete Product");
  }

  const filterHandler = (typeInfo, vendorInfo) => {
      _logger("filter firing", typeInfo, vendorInfo);

      setPageData((prevState) => {
         let pd = {...prevState};
         pd.typeInfo = typeInfo;
         pd.vendorInfo = vendorInfo;

         return pd;
      })

      if(typeInfo.id && vendorInfo.id) {
         productService.searchByVendorByType(pageData.initialIndex, pageData.pageSize, vendorInfo.id, typeInfo.id)
         .then(onGetFilteredProductsSuccess)
         .catch(onGetFilteredProductsError)
      } else if (typeInfo.id && !vendorInfo) {
         productService.searchByType(pageData.initialIndex, pageData.pageSize, typeInfo.id)
         .then(onGetFilteredProductsSuccess)
         .catch(onGetFilteredProductsError)
      } else if (vendorInfo.id && !typeInfo) {
         productService.searchByVendor(pageData.initialIndex, pageData.pageSize, vendorInfo.name)
         .then(onGetFilteredProductsSuccess)
         .catch(onGetFilteredProductsError)
      } else {
         toastr.error("Please select a filter", "Almost there");
      }
  }

  const onGetFilteredProductsSuccess = (response) => {
   _logger("Filtered Products", response);
  let productsArray = response.item.pagedItems;

      setPageData((prevState)=>{
         const pd = {...prevState};
         pd.productComponents = productsArray.map(mapProduct);

         pd.pageIndex = response.item.pageIndex;
         pd.totalCount = response.item.totalCount;
         pd.pageSize = response.item.pageSize;

         return pd;
      })
      
   toastr.success("Products Filtered", "Success!");
   }

   const onGetFilteredProductsError = (err) => {
      _logger("Paginated Fail", err);
      toastr.error("No matched products", "Check filters");
  } 

  const resetHandler = () => {
      setPageData((prevState)=>{
         const pd = {...prevState};
         pd.productComponents = pd.arrayOfProducts.map(mapProduct)
         pd.pageIndex = pd.initialIndex;
         pd.pageSize = pd.initialSize;
         pd.totalCount = pd.initialCount;
         pd.searchQuery = "";
         pd.typeInfo = "";
         pd.vendorInfo = "";

         return pd;
      })
  }

  const searchHandler = (query) => {
   if (query === "") {
      toastr.error("You forgot to type something!");
      
      setPageData((prevState) => {
         let pd = {...prevState}
         pd.productComponents = pd.arrayOfProducts.map(mapProduct)

         return pd
      });
    } else {
      setPageData((prevState) => {
         let pd = {...prevState};
         pd.searchQuery = query;

         return pd;
      })

      productService
        .searchQuery(query, 0, pageData.pageSize)
        .then(onSearchSuccess)
        .catch(onSearchError);
    }
  }

  const onSearchSuccess = (response) => {
   toastr.success("Here's what I found", "Look");
   let searchResults = response.item.pagedItems
   setPageData((prevState) => {
      let pd = {...prevState};
      pd.productComponents = searchResults.map(mapProduct);
      pd.totalCount = response.item.totalCount;
      

      return pd;
   })
  }

  const onSearchError = (err) => {
   toastr.warning("Try another search");
   _logger(err);
  }

  const queryHandler = (query) => {
   setPageData((prevState) => {
      let pd = {...prevState};
      pd.searchQuery = query;

      return pd;
   })
  }

    return (
        <>
         <div className="py-4 py-lg-8 pb-14">
            <Tab.Container>
               <Row className="justify-content-center row">
                  <Col sm={12} md={12} lg={12} className="mb-2">
                     <div className="text-center mb-4">
                        <Link to={"/vendors"}>
                        <a
                           className="fs-5 fw-semi-bold d-block mb-4 text-primary"
                        >
                           Trusted Vendors 
                        </a>
                        </Link>
                        <h1 className="display-3 fw-bold mb-4"> Products</h1>
                        <span className="mb-3 d-inline-block">Giving only the best to our patients</span>
                     </div>
                  </Col>
               </Row>
            </Tab.Container>
            <Tab.Container defaultActiveKey="grid" className=" product-cards">
               <Tab.Content>
                  <Tab.Pane eventKey="grid" className="pb-4">
                  <Row>   
                     <Col lg={11}>
                        <ProductCollapse
                           onFilterClicked={filterHandler}
                           onResetClicked={resetHandler}
                           onSearchClicked={searchHandler}
                           onSearchChanged={queryHandler}
                        />
                     </Col>
                     <Col lg={1}>
                        <OverlayTrigger
                           placement="left"
                           delay={{ show: 250, hide: 400 }}
                           overlay={(
                              <Tooltip id="button-tooltip">
                                    Click to add a product!
                              </Tooltip>
                              )}
                           >   
                           <Button
                              type="submit"
                              className="btn btn-primary btn btn-secondary text-light edit-card ms-14 mb-2"
                              onClick={onAddClicked}
                              >
                              +
                           </Button>
                        </OverlayTrigger>   
                     </Col>
                  </Row>
                     <Row className="justify-content-center">
                        {pageData.productComponents}
                     </Row>
                  </Tab.Pane>
               </Tab.Content>
            </Tab.Container>
            <Tab.Container className="m-2">
               <Row>
                  <div className="border-bottom pb-4 mb-4 d-flex align-items-center justify-content-between">
                     <Pagination 
                        style={{margin: "auto"}}
                        locale={locale}
                        current={pageData.pageIndex + 1}
                        onChange={onPageChange}
                        pageSize={pageData.pageSize}
                        total={pageData.totalCount}
                        />
                  </div>
               </Row>      
            </Tab.Container>
         </div>
      </>
    ) 
    
};

Products.propTypes = {
   currentUser: PropTypes.shape({
      roles: PropTypes.arrayOf(PropTypes.string)
   })
}
        
export default Products;
                                                                                   