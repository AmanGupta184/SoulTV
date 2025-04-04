import express from "express";
import * as UserController from "../Controllers/UserController.js";
import { protect, admin } from "../Middlewares/Auth.js";

const router = express.Router();
//public routes
router.post("/", UserController.registerUser);
router.post("/login", UserController.loginUser);

//private routes
router.put("/", protect, UserController.updateUserProfile);
router.delete("/", protect, UserController.deleteUserProfile);
router.put("/password", protect, UserController.changeUserPassword);
router.get("/favorites", protect, UserController.getLikedMovies);
router.post("/favorites", protect, UserController.addLikedMovie);
router.delete("/favorites", protect, UserController.deleteLikedMovie);

//Admin routes
router.get("/", protect, admin, UserController.getUsers);
router.delete("/:id", protect, admin, UserController.deleteUser);

export default router;
