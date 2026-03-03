const express = require("express");

const router = express.Router();
const auth = require("../middlewares/auth.middleware");
const audit = require("../utils/auditLogger");
const {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/product.controller");

router.get("/", auth(["ADMIN", "BANKER", "AUDITOR"]), getAllProducts);
router.post("/", auth(["ADMIN"]), createProduct);
router.get("/:id", auth(["ADMIN", "BANKER", "AUDITOR"]), getProductById);
router.put("/:id", auth(["ADMIN"]), updateProduct);
router.delete("/:id", auth(["ADMIN"]), deleteProduct);

router.post("/", auth(["ADMIN"]), createProduct);
module.exports = router;
