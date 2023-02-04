import ProductManager from "./ProductManager.js";
import cartModel from "../models/carts.model.js";

const dbpm = new ProductManager();

export default class CartsManager {
  constructor() {}

  async addCart() {
    return await cartModel.create({products: []});
  }

  async getCarts() {
    return await cartModel.find();
  }

  async getCartById(id) {
    return await cartModel.findById(id);
  }

  async addProductToCart(cid, pid) {
    return await cartModel.updateOne(cid, {
      $push: {products: [...products, pid]},
    });
  }

  async removeToCart(cid, pid) {
    return await cartModel.updateOne(cid, {$pull: {products: {_id: pid}}});
  }
}
