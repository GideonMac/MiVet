import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import debug from "sabio-debug";
import productService from "services/productService";
import { useNavigate, useLocation } from "react-router-dom";
import lookUpService from "services/lookUpService";
import vendorsService from "services/vendorsService";
import toastr from "toastr";
import "../../toastr/build/toastr.css"
import { productSchema } from "schemas/productSchema";
import { Button, Card, Col, Row } from "react-bootstrap";
import FileUpload from "components/fileUpload/FileUpload";
import "./product.css";

const _logger = debug.extend("ProductForm");

function ProductForm () {
    const [productFormData, setProductFormData] = useState({
        sku: "",
        name: "",
        manufacturer: "",
        year: "",
        description: "",
        specifications: "",
        productTypeId: 0,
        vendorId: 0,
        isVisible: true,
        isActive: true,
        primaryImage: "",
    })

    const [formInfo, setFormInfo] = useState({
        productTypes: [],
        vendors: [],
        imageDone: false,
    })

    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=> {
        lookUpService.LookUp(["ProductType"])
        .then(onGetTypesSuccess)
        .catch(onGetTypesError);

        vendorsService.getSimpleVendors()
        .then(onGetVendorsSuccess)
        .catch(onGetVendorsError);

        if(location.state){    
        setProductFormData(prevState => {
                let fd = {...prevState};
                fd.id = location.state.id;
                fd.sku = location.state.sku;
                fd.name = location.state.name;
                fd.manufacturer = location.state.manufacturer;
                fd.year = location.state.year;
                fd.description = location.state.description;
                fd.specifications = location.state.specifications;
                fd.productTypeId = location.state.productType.id;
                fd.vendorId = location.state.vendor.id;
                fd.primaryImage = location.state.primaryImage;
                
                return fd;
            })
        }
        }, []);    

    const getImageDate = response => {
        _logger("getImageDate", response);
        const image = response[0]
        setProductFormData((prevState) => {
            let pd = {...prevState};
            pd.primaryImage = image.url

            return pd
        })
        setFormInfo((prevState) => {
            let fd = {...prevState};
            fd.imageDone = true;

            return fd
        });
        
    };    

    const imageDone = () => {

        return (<React.Fragment>
            <span className="mb-3 mt-5 ms-23">Image Preview</span>
            <span className="mb-3"><img className="product-img-uploaded ms-22 mt-1" src={productFormData.primaryImage} alt="uploaded img"></img></span>
        </React.Fragment>)
    };    
    
    const onGetTypesSuccess = (response) => {
        let allTypes = response.item.productType;

        setFormInfo(prevState => {
            let mappedInfo = {...prevState};
            mappedInfo.productTypes = allTypes.map(mapOptions);
            return mappedInfo;
        })
    }

    const onGetVendorsSuccess = (response) => {
        let allVendors = response.items;

        setFormInfo(prevState => {
            let mappedInfo = {...prevState};
            mappedInfo.vendors = allVendors.map(mapOptions);
            return mappedInfo;
        })
    }    

    const mapOptions = (anOption) => {
        return(
            <option 
            key={anOption.id} 
            value={anOption.id}>{anOption.name}</option>
        )
    }

    const onSubmitClicked = (values) => {
        if(!productFormData.id) {
        productService.addProduct(values)
        .then(onSubmitSuccess)
        .catch(onSubmitError)
        } else {
            productService.updateProduct(productFormData.id, values)
            .then(onEditSuccess)
            .catch(onEditError)
        }
      }

    const onSubmitSuccess = (response) => {
        _logger("product submit success", response);
        toastr.success("You have successfully added a product!", "Awesome");
        navigate("/products");
    }

    const onSubmitError = (err) => {
        _logger("product submit fail", err)
        toastr.error("Please fill out all fields", "Failed to add Product");
    }

    const onEditSuccess = (response) => {
        _logger("product updated", response);
        toastr.success("You have successfully edited a product!", "Awesome");
        navigate("/products");
    }

    const onEditError = (err) => {
        _logger("product update fail", err);
        toastr.error("Please fill out all fields", "Failed to update Product");
    }

    const onGetTypesError = (err) => {
        _logger(err);
    }

    const onGetVendorsError = (err) => {
        _logger(err);
    }

    const onGoToProductsClicked = (e) =>{
        e.preventDefault();
        navigate("/products");
    }

    return(
        <>
         <div className="py-4 py-lg-8 pb-14">
            <div className="container">
               <Row className="justify-content-center">
                    <Col sm={12} md={12} lg={12} className="mb-2">
                     <div className="text-center mb-4">
                        <h1 className="display-3 fw-bold mb-4"> {productFormData.id ? "Update" : "Add"} a Product</h1>
                        <span className="mb-3 d-inline-block">Giving only the best to our patients</span>
                     </div>
                  </Col>
               </Row>
            </div>
            <Col className="container">
                <Button
                  type="submit"
                  className="btn-primary mb-4"
                  onClick={onGoToProductsClicked}
                  >
                  Go to Products
                </Button>
            </Col>
            <Card className="justify-content-center container shadow-lg">
                <Formik
                    enableReinitialize={true}
                    initialValues={productFormData}
                    onSubmit={onSubmitClicked}
                    validationSchema={productSchema}
                    >
                <Form id="loginForm" className="row">
                    <Col>
                        <div className="form-group m-2 ">
                            <label
                            htmlFor="sku"
                            className="form-label text-dark form-control-lg"
                            >SKU</label>
                            <Field
                                className="form-control"
                                type="text"
                                placeholder="Enter product SKU"
                                name="sku"
                            />
                            <ErrorMessage 
                                name="sku" 
                                component="div"
                                className="mt-1 text-danger"
                            />
                        </div>
                        <div className="form-group m-2 ">
                            <label
                                htmlFor="name"
                                className="form-label text-dark form-control-lg"
                                >Name</label>
                            <Field
                                type="text"
                                className="form-control"
                                name="name"
                                placeholder="Enter your product name"
                            />
                            <ErrorMessage 
                                name="text" 
                                component="div" 
                                className="mt-1 text-danger"
                            />
                        </div>
                        <div className="form-group m-2 ">
                            <label
                                htmlFor="manufacturer"
                                className="form-label text-dark form-control-lg"
                                >Manufacturer</label>
                            <Field
                                type="text"
                                className="form-control"
                                name="manufacturer"
                                placeholder="Enter your product manufacturer"
                            />
                            <ErrorMessage 
                                name="manufacturer" 
                                component="div" 
                                className="mt-1 text-danger"
                            />
                        </div>
                        <div className="form-group m-2 ">
                            <label
                                htmlFor="year"
                                className="form-label text-dark form-control-lg"
                                >Year</label>
                            <Field
                                type="text"
                                className="form-control"
                                name="year"
                                placeholder="Enter your product year"
                            />
                            <ErrorMessage 
                                name="year" 
                                component="div" 
                                className="mt-1 text-danger"
                            />
                        </div>
                        <div className="form-group m-2 mb-4 ">
                            <label
                                htmlFor="description"
                                className="form-label text-dark form-control-lg"
                                >Description</label>
                            <Field
                                type="text"
                                className="form-control"
                                name="description"
                                placeholder="Enter your product description"
                            />
                            <ErrorMessage 
                                name="description" 
                                component="div" 
                                className="mt-1 text-danger"
                            />
                        </div>
                        <div className="justify-content-center">
                            <button
                                type="submit"
                                className="btn btn-primary text-light col-4 ms-5 mb-4"
                                id="btnSubmit"
                            >
                                {productFormData.id ? "Update" : "Submit"}
                            </button>
                        </div>
                    </Col>
                    <Col>
                        <div className="form-group m-2 ">
                            <label
                                htmlFor="specifications"
                                className="form-label text-dark form-control-lg"
                                >Specifications</label>
                            <Field
                                type="text"
                                className="form-control"
                                name="specifications"
                                placeholder="Enter your product specifications"
                            />
                            <ErrorMessage 
                                name="specifications" 
                                component="div" 
                                className="mt-1 text-danger"
                            />
                        </div>
                        <div className="form-group m-2 ">
                            <label
                                htmlFor="productTypeId"
                                className="form-label text-dark form-control-lg"
                                >Type</label>
                            <Field
                                as="select"
                                className="form-control"
                                name="productTypeId"
                            >
                             <option value="0">Please select a product type below</option>
                            {formInfo.productTypes}
                            </Field>
                            <ErrorMessage 
                                name="productTypeId" 
                                component="div" 
                                className="mt-1 text-danger"
                            />
                        </div>
                        <div className="form-group m-2 ">
                            <label
                                htmlFor="vendorId"
                                className="form-label text-dark form-control-lg"
                                >Vendor</label>
                            <Field
                                as="select"
                                className="form-control"
                                name="vendorId"
                            >
                            <option value="0">Please select a product vendor below</option>
                            {formInfo.vendors}
                            </Field>
                            <ErrorMessage 
                                name="vendorId" 
                                component="div" 
                                className="mt-1 text-danger"
                            />
                        </div>
                        <div className="form-group m-2 ">
                            <label
                                htmlFor="primaryImage"
                                className="form-label text-dark form-control-lg"
                                >Image Url</label>
                            <Field
                                type="text"
                                className="form-control mb-3"
                                name="primaryImage"
                                placeholder="Enter your product image url"
                            />
                            <ErrorMessage 
                                name="primaryImage" 
                                component="div" 
                                className="mt-1 text-danger"
                            />
                            <div className="col">
                                {formInfo.imageDone && imageDone()}    
                                {!formInfo.imageDone && <FileUpload name="imageFile" onUploadSuccess={getImageDate}></FileUpload>}
                            </div>
                        </div>
                    </Col>
                    </Form>
                </Formik>
            </Card>
         </div>
      </>
    )
}

export default ProductForm