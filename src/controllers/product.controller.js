import mongoose from "mongoose";
import jwt from "jsonwebtoken";

import Products from "../models/product.js";
import { errorHandler } from "../utils/index.js";
import { getProducts, getProductById, isProductPresent } from "../helpers/product.js";

const addproduct = async (req, res) => {
  const title = req.body.title;
  const description = req.body.description;
  const name = req.body.name;
  const price = req.body.price;
  const imageURL = req.body.imageURL;
  const thumbNailURL = req.body.thumbNailURL;
  const category = req.body.category;
  const variants = req.body.variants;

  if (!title || !description || !price || !category || !name) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const newRecord = new Products({
      _id: new mongoose.Types.ObjectId(),
      title: title,
      description: description,
      name: name,
      price: price,
      imageURL: imageURL,
      thumbNailURL: thumbNailURL,
      category: category,
      variants: variants,
    });

    await newRecord.save();

    res.send(newRecord);
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

const updateProduct = async (req, res) => {
  const productId = req.params["productId"];

  const title = req.body.title;
  const description = req.body.description;
  const name = req.body.name;
  const price = req.body.price;
  const imageUrl = req.body.imageURL;
  const thumbNailURL = req.body.thumbNailURL;

  if (!productId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const details = await getProductById(productId);

    const updated = await Products.findOneAndUpdate(
      { _id: productId },
      {
        title: title || details.title,
        description: description || details.description,
        name: name || details.name,
        price: price || details.price,
        imageUrl: imageUrl || details.imageUrl,
        thumbNailURL: thumbNailURL || details.thumbNailURL,
      },
      {
        new: true,
      }
    );

    res.send(updated);
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const lstProducts = await getProducts();

    if (lstProducts) {
      res.send(lstProducts);
    } else {
      errorHandler(res, { message: "Products not found!" }, 400);
      return;
    }
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

const getProduct = async (req, res) => {
  const productId = req.params["productId"];

  if (!productId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const productPresent = await isProductPresent(productId);
  
    if (!productPresent) {
      errorHandler(res, { message: "Product not found!" }, 400);
      return;
    }
    const productRecord = await getProductById(productId);

    if (productRecord) {
      res.send(productRecord);
    } else {
      errorHandler(res, { message: "Product not found!" }, 400);
      return;
    }
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

const getProductsByIds = async (req, res) => {
  const productIds = req.params["productIds"];
  
  try {
    const lstProductId = productIds.split(',');
    const lstProducts = await getProductDetails(lstProductId);    

    if(lstProducts.length > 0) {    
      res.send(lstProducts);
    }
    else {
      errorHandler(res, { message: "Products not found!" }, 400);
      return;
    }
  }
  catch (err){
    errorHandler(res, err, 500);
  }
}

const getProductDetails = async (lstProductId) => {
  let lstProductDetails = [];
  for(const productId of lstProductId) {
    var productDetails = await getProductById(productId);
    lstProductDetails = lstProductDetails.concat(productDetails);
  }

  return lstProductDetails;
};

const deleteProduct = async (req, res) => {
  const productId = req.params["productId"];

  if (!productId) {
    errorHandler(res, { message: "Bad Request - Payload not matching" }, 400);
    return;
  }

  try {
    const productPresent = await isProductPresent(productId);

    if (productPresent) {
      const deletedProduct = await Products.findByIdAndDelete(productId);
      if(!deletedProduct) {
        errorHandler(res, { message: "Unable to delete product" }, 400);
      }

      res.send(updatedRecord);
    }
  } catch (err) {
    errorHandler(res, err, 500);
  }
};

export default {
  addproduct,
  updateProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  getProductsByIds
};
