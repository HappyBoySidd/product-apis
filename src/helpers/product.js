import Products from "../models/product.js";

export const getProducts = async () =>
  await Products.find({}).lean();

export const getProductById = async (productId) => {
  const details = await Products.findOne({
    _id: productId,
  }).lean();

  return details;
};

export const isProductPresent = async (productId) =>
  await getProductById(productId) ? true : false;
