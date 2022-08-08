
const { products } = require("../data");

const Home = (req, res) => {
  // res.send("<h1>HOME PAGE</h1>")
  res.send("Home Page");
};

const GetAllProduct = (req, res) => {
  res.status(200).json({ success: true, data: products });
};

const SingleProduct = (req, res) => {
  const id = Number(req.params.id);
  const newProduct = products.find((product) => product.id === id);
  if (!newProduct) {
    return res.status(404).json({ sucess: false });
  }
  res.status(200).json({ success: true, data: newProduct });
};

const CreateProduct = (req, res) => {
  const name = req.body.name;
  const id = req.body.id;
  console.log(req.body);
  let newProduct = [...products];

  if (!name || !id) {
    return res
      .status(404)
      .json({ sucess: false, msg: "You Should not Provide Complete Data" });
  } else {
    newProduct.push({ name, id });
  }

  res.status(200).json(newProduct);
};

const UpdateProduct = (req, res) => {
  const id = req.params.id;
  const { name } = req.body;
  let flag = false;
  let newproduct = products.map((product) => {
    if (product.id === Number(id)) {
      flag = true;
      product.name = name;
    }
    return product;
  });
  if (flag == false) {
    return res
      .status(404)
      .json({ sucess: false, msg: "Cannot Find Any product with given id" });
  }

  res.status(200).json({ success: true, data: newproduct });
};

const DeletProduct = (req, res) => {
  const id = Number(req.params.id);
  const newProduct = products.filter((Product) => Product.id !== id);
  if (!newProduct) {
    return res.status(404).json({ sucess: false });
  }
  res.status(200).json({ sucess: true, data: newProduct });
};

module.exports = {
  Home,
  GetAllProduct,
  SingleProduct,
  CreateProduct,
  UpdateProduct,
  DeletProduct
};