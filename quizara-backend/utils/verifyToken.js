const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const token = req.header("auth-token");
  console.log(req);
  if (!token)
    return res
      .status(405)
      .json({ success: false, message: "Error in authorizing" });
  try {
    const verified = await jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(verified, "pppp");
    req.user = verified;
    next();
  } catch (err) {
    res
      .status(401)
      .json({
        success: false,
        message: "Error in authorizingg",
        err: err.message,
        token,
      });
  }
};

module.exports = { verifyToken };
