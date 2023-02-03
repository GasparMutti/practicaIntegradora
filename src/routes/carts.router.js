import {Router} from "express";
import CartsManager from "../dao/fileManager/CartsManager.js";

const router = Router();

const cm = new CartsManager();

router.post("/", async (req, res) => {
  const response = await cm.addCart();
  if (!response.error) {
    res.send(response);
  } else {
    res.status(response.status).send(response);
  }
});

router.get("/:cid", async (req, res) => {
  const id = +req.params.cid;
  const response = await cm.getCartById(id);
  if (!response.error) {
    res.send(response.cart.products);
  } else {
    res.status(response.status).send(response);
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  const cid = +req.params.cid;
  const pid = +req.params.pid;
  const response = await cm.addProductToCart(cid, pid);
  if (!response.error) {
    res.send(response);
  } else {
    res.status(response.status).send(response);
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const cid = +req.params.cid;
  const pid = +req.params.pid;
  const response = await cm.removeToCart(cid, pid);
  if (!response.error) {
    res.send(response);
  } else {
    res.status(response.status).send(response);
  }
});

export default router;
