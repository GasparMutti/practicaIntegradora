import {productModel} from "../models/products.model.js";
export default class ProductManager {
  constructor() {}

  async getProducts(limit) {
    try {
      const products = await productModel.find();
      if (limit) {
        return await productModel.find().limit(limit);
      } else {
        return products;
      }
    } catch (error) {
      return {
        status: "500",
        error:
          "An error has occurred at moment of read the database, this error is from server and we're working on resolve the problem.",
      };
    }
  }

  async addProduct(product) {
    try {
      return await productModel.create(product);
    } catch (error) {
      return error;
    }
  }

  async getProductById(id) {
    try {
      return await productModel.findById({id});
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, object) {
    try {
      return await productModel.updateOne({id, object});
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      return await productModel.deleteOne({id});
    } catch (error) {
      return error;
    }
  }
}
