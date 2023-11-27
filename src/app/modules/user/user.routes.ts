import express from "express";
import { UserControllers } from "./user.controller";
const router = express.Router();

// call controller
router.post("/users", UserControllers.creatUser);
router.get("/users", UserControllers.getAllUsers);
router.get("/users/:userId", UserControllers.getUserById);
router.put("/users/:userId", UserControllers.getUserByIdAndUpdate);
router.delete("/users/:userId", UserControllers.deleteUSerById);
export const UserRoutes = router;
