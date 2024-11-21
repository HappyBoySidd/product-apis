import Products from "../models/product.js";

export const getProducts = async () =>
  await Products.find({}).lean();

export const getProductById = async (productId) =>
    await Products.findOne({ productId }).lean();

export const isProductPresent = async (productId) =>
  await getProductById(productId) ? true : false;