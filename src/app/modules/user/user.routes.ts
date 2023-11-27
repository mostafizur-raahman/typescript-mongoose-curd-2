import express from "express";
import { UserControllers } from "./user.controller";
const router = express.Router();

// call controller
router.post("/users", UserControllers.creatUser);
router.get("/users", UserControllers.getAllUsers);
router.get("/users/:userId", UserControllers.getUserById);
router.put("/users/:userId", UserControllers.getUserByIdAndUpdate);
router.delete("/users/:userId", UserControllers.deleteUSerById);
router.put("/users/:userId/orders", UserControllers.createNewOrderForUser);
router.get("/users/:userId/orders", UserControllers.getOrdersForUser);
router.get(
    "/users/:userId/orders/total-price",
    UserControllers.calculateTotalPriceForUser
);
export const UserRoutes = router;
