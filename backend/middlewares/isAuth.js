import jwt from "jsonwebtoken";

const isAuth = async (req, res, next) => {
  try {
    let token = req.cookies.token;
    if (!token) {
      return res.status(400).json({
        message: "user does not have a token",
      });
    }
    let decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Authentication error [isAuth.js]" });
  }
};
export default isAuth;
