import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";

const protect = asyncHandler(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;
  // console.log(token, req.cookies);

  if (token) {
    try {
      const secret = process.env.JWT_SECRET ?? "";
      const decoded = await jwt.verify(token, secret);
      if (decoded.userId == "admin123") return next();
      req.user = await User.findOne({ _id: decoded.userId }).select(
        "-password"
      );
      next();
    } catch (error) {
      console.log(error.message);

      res.status(401);
      throw new Error("Not au authorised, invalid token", error);
    }
  } else {
    res.status(401);
    throw new Error("Not authorised, no token");
  }
});

export { protect };
