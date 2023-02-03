import mongoose from "mongoose";

const productsCollection = "products";

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  category: {
    type: String,
    require: true,
  },
  thumbnails: {
    type: Array,
    require: true,
  },
  status: {
    type: Boolean,
    require: true,
  },
  code: {
    type: String,
    unique: true,
    require: true,
  },
  stock: {
    type: Number,
    require: true,
  },
});

export const productModel = mongoose.model(productsCollection, productSchema);
