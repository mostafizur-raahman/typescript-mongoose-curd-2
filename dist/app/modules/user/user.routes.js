"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const router = express_1.default.Router();
// call controller
router.post("/users", user_controller_1.UserControllers.creatUser);
router.get("/users", user_controller_1.UserControllers.getAllUsers);
router.get("/users/:userId", user_controller_1.UserControllers.getUserById);
router.put("/users/:userId", user_controller_1.UserControllers.getUserByIdAndUpdate);
router.delete("/users/:userId", user_controller_1.UserControllers.deleteUSerById);
router.put("/users/:userId/orders", user_controller_1.UserControllers.createNewOrderForUser);
router.get("/users/:userId/orders", user_controller_1.UserControllers.getOrdersForUser);
router.get("/users/:userId/orders/total-price", user_controller_1.UserControllers.calculateTotalPriceForUser);
exports.UserRoutes = router;
