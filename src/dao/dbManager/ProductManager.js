import {productModel} from "../models/products.model";
export default class ProductManager {
  constructor() {}

  async getProducts(limit) {
    try {
      const products = productModel.find();
      if (limit) {
        return productModel.find().limit(limit);
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
      return productModel.findById({_id: id});
    } catch (error) {
      return error;
    }
  }

  async updateProduct(id, object) {
    try {
      return productModel.updateOne({_id: id, object});
    } catch (error) {
      return error;
    }
  }

  async deleteProduct(id) {
    try {
      return productModel.deleteOne({_id: id});
    } catch (error) {
      return error;
    }
  }
}
