import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../Modals/UserModal.js";

//@desc Authenticate user & get token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
};

//protection middleware
const protect = asyncHandler(async (req, res, next) => {
  let token;
  //check if token exists in header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    //set token from bearer token in header
    try {
      token = req.headers.authorization.split(" ")[1];
      //verify token and get user id
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      //get user id from decode token
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      res.status(401);
      throw new Error("Not authorized,token failed");
    }
  }
  if (!token) {
    res.status(401);
    throw new Error("Not authorized,No token");
  }
});

//admin middleware
const admin = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401);
    throw new Error("Not authorized as admin");
  }
});
export { generateToken, protect, admin };
