import ProductManager from "./ProductManager.js";
import {cartModel} from "../models/carts.model.js";

const dbpm = new ProductManager();

export default class CartsManager {
  constructor() {}

  async addCart() {
    try {
      return await cartModel.create({products: []});
    } catch (error) {
      return {
        status: 500,
        error: `An error occurred while updating the product with id ${id}`,
      };
    }
  }

  async getCarts() {
    try {
      return await cartModel.find();
    } catch (error) {
      return {
        status: 500,
        error: `An error occurred while obtaining the product with id ${id}`,
      };
    }
  }

  async getCartById(id) {
    try {
      const cart = await cartModel.findById(id);
      if (cart === null)
        return {
          status: 404,
          error: `Cart with id ${id} not found`,
        };
      return cart;
    } catch (error) {
      return {
        status: 500,
        error: `An error occurred while obtaining the product with id ${id}`,
      };
    }
  }

  async addProductToCart(cid, pid) {
    try {
      const cartFinded = await this.getCartById(cid);
      if (cartFinded.status === 404 || cartFinded.error)
        return {
          status: 404,
          error: `Cart with id ${cid} not found`,
        };
      const productFinded = await dbpm.getProductById(pid);
      if (productFinded.status === 404 || productFinded.error)
        return {
          status: 404,
          error: `Product with id ${pid} not found`,
        };
      return await cartModel.findByIdAndUpdate(cid, {$push: {products: pid}});
    } catch (error) {
      return {
        status: 500,
        error: `An error occurred while adding the product`,
      };
    }
  }

  async removeToCart(cid, pid) {
    try {
      return await cartModel.findByIdAndUpdate(cid, {$pull: {products: pid}});
    } catch (error) {
      return {
        status: 500,
        error: `An error occurred while deleting the product with id ${id}`,
      };
    }
  }
}
