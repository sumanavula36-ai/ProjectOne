const router = require("express").Router();
const auth = require("../middlewares/auth.middleware");
const audit = require("../utils/auditLogger");

router.get("/", auth(["ADMIN", "BANKER"]), (req, res) => {
  res.json([{ id: 1, name: "Ahmed Ali", kyc: "APPROVED" }]);
});

router.post("/", auth(["ADMIN"]), (req, res) => {
  audit("Create Customer", req.user);
  res.json({ message: "Customer created" });
});

module.exports = router;
