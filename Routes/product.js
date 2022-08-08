const express = require('express');

const route = express.Router();


const {GetAllProduct,SingleProduct,CreateProduct,UpdateProduct,DeletProduct} = require("../Controller/ProductController");



route.get("/", GetAllProduct);

route.get("/:id", SingleProduct);
route.delete("/:id", DeletProduct);

route.post("/", CreateProduct);

route.put("/:id", UpdateProduct);

module.exports = route;