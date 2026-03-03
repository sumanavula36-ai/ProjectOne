const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const audit = require("../utils/auditLogger");

router.get("/", auth(["BANKER"]), (req, res) => {
  res.json([{ id: 101, type: "SAVINGS", balance: 5000 }]);
});

router.post("/block", auth(["ADMIN"]), (req, res) => {
  audit("Block Account", req.user);
  res.json({ message: "Account blocked" });
});

module.exports = router;
