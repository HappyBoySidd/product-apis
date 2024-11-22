import Products from "../models/product.js";

export const getProducts = async () =>
  await Products.find({}).lean();

export const getProductById = async (productId) => {
  
  const details = await Products.find({}).lean();
  var result = details.find(obj => {
    return obj._id === productId
  })

  return result;
};

export const isProductPresent = async (productId) =>
  await getProductById(productId) ? true : false;
