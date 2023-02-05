import {Router} from "express";
import ProductManager from "../dao/fileManager/ProductManager.js";
import dbProductManager from "../dao/dbManager/ProductManager.js";

const router = Router();

const pm = new ProductManager();
const dbpm = new dbProductManager();

router.post("/", async (req, res) => {
  const {
    title,
    description,
    code,
    price,
    status = true,
    stock,
    category,
    thumbnails,
  } = req.body;

  const product = {
    title,
    description,
    code,
    price,
    status,
    stock,
    category,
    thumbnails,
  };
  const newProduct = await dbpm.addProduct(product);
  res.json(newProduct);
});

router.get("/?", async (req, res) => {
  const limit = +req.query.limit;
  const products = await dbpm.getProducts();
  res.json(products);
});

router.get("/:pid", async (req, res) => {
  const id = req.params.pid;
  const product = await dbpm.getProductById(id);
  res.json(product);
});

router.put("/:pid", async (req, res) => {
  const id = req.params.pid;
  const object = req.body;
  const productUpdated = await dbpm.updateProduct(id, object);
  res.json(productUpdated);
});

router.delete("/:pid", async (req, res) => {
  const id = req.params.pid;
  const productDeleted = await dbpm.deleteProduct(id);
  res.json(productDeleted);
});

export default router;
