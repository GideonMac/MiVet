import * as yup from "yup";

const productSchema = yup.object().shape({
  sku: yup.string().min(2).max(50).required("Is Required"),
  name: yup.string().min(2).max(50).required("Is Required"),
  manufacturer: yup.string().min(2).max(50).required("Is Required"),
  year: yup.number().required("Is Required"),
  description: yup.string().min(2).max(5000),
  specifications: yup.string().required("Is Required"),
  productTypeId: yup.number().required("Is Required"),
  vendorId: yup.number().required("Is Required"),
  primaryImage: yup.string().min(2).max(5000)
});

export { productSchema };