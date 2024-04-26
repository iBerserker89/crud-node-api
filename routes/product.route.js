const express = require("express");
const Product = require("../models/product.model.js");
const router = express.Router();
const {
  getProducts,
  getSingleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller.js");

// Obter a lista de todos os produtos na database
router.get("/", getProducts);
// Obter a lista de um único produto na database, com base em seu ip
router.get("/:id", getSingleProduct);

// Criar um produto
router.post("/", createProduct);

// Update de um produto
router.put("/:id", updateProduct);

// Deleta um produto
router.delete("/:id", deleteProduct);



module.exports = router;
