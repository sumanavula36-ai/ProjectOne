const router = require("express").Router();

const jwt = require("jsonwebtoken");

let refreshTokens = [];
const generateAccessToken = (user) =>
  jwt.sign(user, process.env.JWT_SECRET, { expiresIn: "15m" });

const generateRefreshToken = (user) =>
  jwt.sign(user, process.env.JWT_REFRESH_SECRET, { expiresIn: "7d" });
router.post("/login", (req, res) => {
  const { email } = req.body;

  const role = email.includes("admin")
    ? "ADMIN"
    : email.includes("audit")
      ? "AUDITOR"
      : "BANKER";

  const user = { email, role };

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  refreshTokens.push(refreshToken);

  res.json({
    accessToken,
    refreshToken,
    role,
  });
});

router.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken || !refreshTokens.includes(refreshToken)) {
    return res.status(403).json({ message: "Invalid refresh token" });
  }

  try {
    const user = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const newAccessToken = generateAccessToken({
      email: user.email,
      role: user.role,
    });

    res.json({ accessToken: newAccessToken });
  } catch {
    res.status(403).json({ message: "Expired refresh token" });
  }
});

router.post("/logout", (req, res) => {
  const { refreshToken } = req.body;
  refreshTokens = refreshTokens.filter((t) => t !== refreshToken);
  res.json({ message: "Logged out successfully" });
});

module.exports = router;
