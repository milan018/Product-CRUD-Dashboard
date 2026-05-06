import {
  getAllProductsService,
  getProductByIdService,
  createProductService,
  updateProductService,
  deleteProductService,
} from "../models/product_model.js";
//handle response and request from routes and call service function
const handleresponse = (res, status, message, data = null) => {
  res.status(status).json({ status, message, data });
};
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await getAllProductsService();
    handleresponse(res, 200, "Products retrieved successfully", products);
  } catch (err) {
    next(err);
  }
};
export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await getProductByIdService(id);
    if (product) {
      handleresponse(res, 200, "Product retrieved successfully", product);
    } else {
      handleresponse(res, 404, "Product not found");
    }
  } catch (err) {
    next(err);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price } = req.body;
    const newProduct = await createProductService(name, description, price);
    handleresponse(res, 201, "Product created successfully", newProduct);
  } catch (err) {
    next(err);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { name, description, price } = req.body;
    const updatedProduct = await updateProductService(
      id,
      name,
      description,
      price,
    );
    if (updatedProduct) {
      handleresponse(res, 200, "Product updated successfully", updatedProduct);
    } else {
      handleresponse(res, 404, "Product not found");
    }
  } catch (err) {
    next(err);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deletedProduct = await deleteProductService(id);
    if (deletedProduct) {
      handleresponse(res, 200, "Product deleted successfully", deletedProduct);
    } else {
      handleresponse(res, 404, "Product not found");
    }
  } catch (err) {
    next(err);
  }
};
