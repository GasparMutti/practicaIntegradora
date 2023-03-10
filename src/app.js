import express from "express";
import handlebars from "express-handlebars";
import __dirname from "./utils.js";
import chatRouter from "./routes/chat.router.js";
import productsRoutes from "./routes/products.router.js";
import cartsRoutes from "./routes/carts.router.js";
import mongoose from "mongoose";
import {messageModel} from "./dao/models/messages.model.js";
import {Server} from "socket.io";

const app = express();

const httpServer = app.listen(8080, () =>
  console.log("app listen on port", 8080)
);

const io = new Server(httpServer);

mongoose.connect(
  "mongodb+srv://CoderUser:coderuser123@codercluster.srkjtjy.mongodb.net/ecommerce?retryWrites=true&w=majority",
  (error) => {
    if (error) {
      console.log("No hubo conexion", error);
      process.exit();
    }
  }
);

app.engine("handlebars", handlebars.engine());

app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));

app.use("/chat", chatRouter);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRoutes);

async function getLogs() {
  return await messageModel.find();
}

io.on("connection", async (socket) => {
  console.log("New client connected");

  const logs = await getLogs();
  io.emit("log", {logs});

  socket.on("message", async (data) => {
    await messageModel.create({user: data.user, message: data.message});
    const logs = await getLogs();
    io.emit("log", {logs});
  });
  socket.on("userAuth", (data) => {
    socket.broadcast.emit("newUser", data);
  });
});
