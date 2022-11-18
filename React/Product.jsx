import React, { useState } from "react";
import PropTypes from "prop-types";
import { Card, Col, Button } from "react-bootstrap";
import "./product.css";

function Product(props) {
    const [isShown, setIsShown] = useState(false);
    let permissions = props.currentRoles.roles;

    const isValidUrl = urlString=> {
        var urlPattern = new RegExp('^(https?:\\/\\/)?'+ // validate protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // validate domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // validate OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // validate port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // validate query string
      '(\\#[-a-z\\d_]*)?$','i'); // validate fragment locator
    return !!urlPattern.test(urlString);
  }

    const onDeleteProductClicked = (e) => {
        e.preventDefault();
        props.onProductDeleteClicked(props.product, e);
    }

    const onEditProductClicked = (e) => {
        e.preventDefault();
        props.onProductEditClicked(props.product, e);
    }

    const onCardEnter = () => {
        
        if(permissions.includes("Vet") || permissions.includes("Admin")) {
            setIsShown(true);
        } else {
            setIsShown(false);
        }
    }

    const onCardExit = () => {
        setIsShown(false);
    }

    return (
        <Col sm={12} md={6} lg={2}>
            <Card className="shadow-lg p-3 rounded product-card m-2">
                <Card.Img
                    src={isValidUrl(props.product.primaryImage)? props.product.primaryImage : "https://tinyurl.com/y3t3ctvb"}
                    className="product-img rounded-3"
                    alt="..."/>
                <Card.Body className="card-body text-center"  
                    onMouseEnter={onCardEnter}
                    onMouseLeave={onCardExit}>
                    <Card.Title className="fw-bold text-primary">{props.product.name}</Card.Title>
                    <Card.Subtitle className="text-muted mb-1">Type: {props.product.productType.name}</Card.Subtitle>
                    <Card.Subtitle className="text-muted mb-1">SKU: {props.product.sku}</Card.Subtitle>
                    <Card.Subtitle className="text-muted">Vendor: {props.product.vendor.name}</Card.Subtitle>
                    {isShown && 
                    (<div>
                        <Button
                            size={"sm"}
                            type="submit" 
                            className="btn-danger mt-2"
                            onClick={onDeleteProductClicked}
                        >
                            Delete
                        </Button>
                        <Button
                            size={"sm"}
                            type="submit"
                            className="ms-2 mt-2"
                            onClick={onEditProductClicked}
                        >
                            Edit
                        </Button>
                    </div>)}
                </Card.Body>
            </Card>
        </Col>    
    )
};
                          
Product.propTypes = {
    product: PropTypes.shape({
        sku: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        primaryImage: PropTypes.string,
        productType: PropTypes.shape({
            name: PropTypes.string.isRequired
        }).isRequired,
        vendor: PropTypes.shape({
            name: PropTypes.string.isRequired
        })
    }).isRequired,
    onProductEditClicked: PropTypes.func.isRequired,
    onProductDeleteClicked: PropTypes.func.isRequired,
    currentRoles: PropTypes.shape({
        roles: PropTypes.arrayOf(PropTypes.string)}
    )

};
                       
export default React.memo(Product);
