import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  category: String,
  thumbnails: Array,
  status: Boolean,
  code: String,
  stock: Number,
});

export const productModel = mongoose.model(productsCollection, productSchema);
