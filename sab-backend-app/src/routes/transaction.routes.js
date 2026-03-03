const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const audit = require("../utils/auditLogger");

router.post("/credit", auth(["BANKER"]), (req, res) => {
  audit("Credit Transaction", req.user);
  res.json({ message: "Amount credited" });
});
router.post("/debit", auth(["BANKER"]), (req, res) => {
  audit("Debit Transaction", req.user);
  res.json({ message: "Amount debited" });
});

router.get("/", auth(["BANKER", "AUDITOR"]), (req, res) => {
  res.json([
    { id: 1, type: "CREDIT", amount: 1000, status: "SUCCESS" },
    { id: 2, type: "DEBIT", amount: 500, status: "SUCCESS" },
  ]);
});

module.exports = router;
