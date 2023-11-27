import express from "express";
import { UserControllers } from "./user.controller";
const router = express.Router();

// call controller
router.post("/users", UserControllers.creatUser);
router.get("/users", UserControllers.getAllUsers);
export const UserRoutes = router;
