import { lazy } from "react";
const PageNotFound = lazy(() => import("../components/error/Error404"));
const Products = lazy(() => import("../components/products/Products"));
const ProductForm = lazy(() => import("../components/products/ProductForm"));

const productRoutes = [
  {
    path: "/products",
    name: "Products",
    element: Products,
    roles: ["Vet", "Admin", "User"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/products/new",
    name: "ProductForm",
    element: ProductForm,
    roles: ["Vet", "Admin", "User"],
    exact: true,
    isAnonymous: false,
  },
  {
    path: "/products/:id/edit",
    name: "ProductsEditForm",
    element: ProductForm,
    roles: ["Vet", "Admin"],
    exact: true,
    isAnonymous: false,
  },
];

const errorRoutes = [
  {
    path: "*",
    name: "Error - 404",
    element: PageNotFound,
    roles: [],
    exact: true,
    isAnonymous: false,
  },
];

const allRoutes = [
  ...errorRoutes,
  ...productRoutes,
];

export default allRoutes;
