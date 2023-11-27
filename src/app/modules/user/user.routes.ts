import express from "express";
import { UserControllers } from "./user.controller";
const router = express.Router();

// call controller
router.post("/users", UserControllers.creatUser);
router.get("/users", UserControllers.getAllUsers);
router.get("/users/:userId", UserControllers.getUserById);
export const UserRoutes = router;
