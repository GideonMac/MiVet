import {React, useState, useEffect, Fragment} from "react";
import { Button, Col, Collapse, Form, FormControl, InputGroup, Row} from "react-bootstrap";
import {Typeahead} from "react-bootstrap-typeahead";
import lookUpService from "services/lookUpService";
import vendorsService from "services/vendorsService";
import debug from "sabio-debug"
import PropTypes from "prop-types";

const _logger = debug.extend("ProductsFilter");

const ProductCollapse = (props) => {
    const [optionData, setOptionData] = useState({
        typesArray: [],
        vendorsArray: []
    })
    const [open, setOpen] = useState(false);  
    const [typeSelection, setTypeSelection] = useState([]);
    const [vendorSelection, setVendorSelection] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(()=> {
        lookUpService.LookUp(["ProductType"])
        .then(onGetTypesSuccess)
        .catch(onGetTypesError);

        vendorsService.getSimpleVendors()
        .then(onGetVendorsSuccess)
        .catch(onGetVendorsError);

        }, []); 

    const onGetTypesSuccess = (response) => {
        let allTypes = response.item.productType;
    
        setOptionData(prevState => {
            let od = {...prevState};
            od.typesArray = allTypes
            return od;
        })
    }    

    const onGetVendorsSuccess = (response) => {
        let allVendors = response.items;

        setOptionData(prevState => {
            let od = {...prevState};
            od.vendorsArray = allVendors;
            return od;
        })
    }    

    const onGetTypesError = (err) => {
        _logger(err);
    }        

    const onGetVendorsError = (err) => {
        _logger(err);
    }

    const onFilterBtnClicked = () => {
        let typeInfo = typeSelection[0] ?? "";
        let vendorInfo = vendorSelection[0] ?? ""; 

        props.onFilterClicked(typeInfo, vendorInfo);
    }

    const onResetBtnClicked = () => {
        setTypeSelection([]);
        setVendorSelection([]);

        props.onResetClicked();
    }

    const searchValues = (e) => {
        e.preventDefault();
        const value = e.target.value;
        setSearchQuery((prevState) => {
          let findProduct = { ...prevState };
          findProduct = value;
          return findProduct;
        });
        props.onSearchChanged(value);
      };

    const onSearchBtnClicked = () => {
        props.onSearchClicked(searchQuery)
    }

    return (  
        <Fragment> 
            <Button
                onClick={() => setOpen(!open)}
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className="ms-2 mb-2 "
                >
                Filter By
            </Button>
            <Collapse in={open}>
                <Row>
                <Form className="row m-2">
                    <Col lg={3}>   
                        <Form.Group>
                            <Form.Label>Product Type</Form.Label>
                            <Typeahead
                            id="product-type"
                            labelKey={(pt)=> `${pt.name}`}
                            onChange={setTypeSelection}
                            options={optionData.typesArray}
                            placeholder="Choose a Product Type..."
                            selected={typeSelection}
                            />
                        </Form.Group>
                    </Col>    
                    <Col lg={3}>
                        <Form.Group>
                            <Form.Label>Vendor</Form.Label>
                            <Typeahead
                            id="vendor"
                            labelKey={(vendor)=> `${vendor.name}`}
                            onChange={setVendorSelection}
                            options={optionData.vendorsArray}
                            placeholder="Choose a Vendor..."
                            selected={vendorSelection}
                            />
                        </Form.Group>
                    </Col>
                    <Col className="w-15">
                        <Button
                            size={"sm"}
                            className="mt-5"
                            type="button"    
                            onClick={onFilterBtnClicked}>
                            Filter    
                        </Button>
                        <Button
                            size={"sm"}
                            className="ms-4 mt-5"
                            type="button"    
                            onClick={onResetBtnClicked}>
                            Clear Filters    
                        </Button>
                    </Col> 
                    <Col className="mt-5">
                        <InputGroup className="ms-21">
                            <FormControl
                                placeholder="Search Products"
                                onChange={searchValues}
                            />
                            <Button
                                size={"sm"} 
                                onClick={onSearchBtnClicked}>
                                Search
                            </Button>
                        </InputGroup>
                    </Col>
                </Form>
                </Row>
            </Collapse>     
        </Fragment>
    )
};

ProductCollapse.propTypes = {
    onFilterClicked: PropTypes.func.isRequired,
    onResetClicked: PropTypes.func.isRequired,
    onSearchClicked: PropTypes.func.isRequired,
    onSearchChanged: PropTypes.func.isRequired,
};

export default ProductCollapse
