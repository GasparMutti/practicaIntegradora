import {productModel} from "../models/products.model.js";
export default class ProductManager {
  constructor() {}

  async getProducts(limit) {
    try {
      return !limit
        ? await productModel.find()
        : productModel.find().limit(limit);
    } catch (error) {
      return {
        status: 500,
        error:
          "An error has occurred at moment of read the database, this error is from server and we're working on resolve the problem.",
      };
    }
  }

  async addProduct(product) {
    try {
      return await productModel.create(product);
    } catch (error) {
      return {
        status: 500,
        error: "An error occurred while creating the product",
      };
    }
  }

  async getProductById(id) {
    try {
      const product = await productModel.findById(id);
      if (product === null)
        return {
          status: 404,
          error: `Product with id ${id} not found`,
        };
      return product;
    } catch (error) {
      return {
        status: 500,
        error: `An error occurred while obtaining the product with id ${id}`,
      };
    }
  }

  async updateProduct(id, object) {
    try {
      const productUpdated = await productModel.findByIdAndUpdate(id, object, {
        new: true,
      });
      return productUpdated === null
        ? {
            status: 404,
            error: `Product with id ${id} not found`,
          }
        : productUpdated;
    } catch (error) {
      console.log(error);
      return {
        status: 500,
        error: `An error occurred while updating the product with id ${id}`,
      };
    }
  }

  async deleteProduct(id) {
    try {
      const productDeleted = await productModel.findByIdAndDelete(id);
      return productDeleted === null
        ? {
            status: 404,
            error: `Product with id ${id} not found`,
          }
        : {status: 200, message: `Product ${id} deleted succesfully`};
    } catch (error) {
      return {
        status: 500,
        error: `An error occurred while updating the product with id ${id}`,
      };
    }
  }
}
