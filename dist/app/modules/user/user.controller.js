"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_validation_1 = require("./user.validation");
// create user
const creatUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // creating schema validation using joi
        const user = req.body;
        const { error } = user_validation_1.joiStudentValidator.validate(user);
        if (error) {
            res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    error: error.details,
                },
            });
        }
        const hashedPassword = yield bcrypt_1.default.hash(user.password, 12);
        const userWithHashedPassword = Object.assign(Object.assign({}, user), { password: hashedPassword });
        // Call service func to create
        const result = yield user_service_1.UserServices.createUserIntoDB(userWithHashedPassword);
        const responseData = {
            userId: result.userId,
            username: result.username,
            fullName: result.fullName,
            age: result.age,
            email: result.email,
            isActive: result.isActive,
            hobbies: result.hobbies,
            address: result.address,
        };
        res.status(200).json({
            success: true,
            message: "User created successfully!",
            data: responseData,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// get all the users
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_service_1.UserServices.getAllUsersFromDB();
        const responseData = result.map((user) => ({
            username: user.username,
            fullName: user.fullName,
            age: user.age,
            email: user.email,
            address: user.address,
        }));
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: responseData,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// get user by id
const getUserById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const result = yield user_service_1.UserServices.getUSerByIdFromDB(userId);
        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
});
// update user
const getUserByIdAndUpdate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const updatedData = req.body;
        const result = yield user_service_1.UserServices.getUserByIdAndUpdateFromDB(userId, updatedData);
        if (result) {
            return res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: result,
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: {
                code: 500,
                description: "Internal Server Error",
            },
        });
    }
});
// deletd user from database
const deleteUSerById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required for the delete.",
            });
        }
        const result = yield user_service_1.UserServices.deleteUSerByIdFromDB(userId);
        if (result.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: null,
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: {
                code: 500,
                description: "Internal Server Error",
            },
        });
    }
});
/// create a new new orders
const createNewOrderForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const orderData = req.body;
        const result = yield user_service_1.UserServices.createNewOrderForUserInDB(userId, orderData);
        if (result) {
            return res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null,
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: {
                code: 500,
                description: "Internal Server Error",
            },
        });
    }
});
// get users orders
const getOrdersForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.userId;
        const orders = yield user_service_1.UserServices.getOrdersForUserFromDB(userId);
        if (orders !== null) {
            return res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: orders,
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: "User not found or has no orders",
                error: {
                    code: 404,
                    description: "User not found or has no orders!",
                },
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: {
                code: 500,
                description: "Internal Server Error",
            },
        });
    }
});
// calculate the price for user
const calculateTotalPriceForUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.params;
        const totalPrice = yield user_service_1.UserServices.calculateTotalPriceForUserFromDB(userId);
        if (totalPrice !== null) {
            return res.status(200).json({
                success: true,
                message: "Total price calculated successfully!",
                data: {
                    totalPrice: totalPrice.toFixed(2),
                },
            });
        }
        else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: {
                code: 500,
                description: "Internal Server Error",
            },
        });
    }
});
exports.UserControllers = {
    creatUser,
    getAllUsers,
    getUserById,
    getUserByIdAndUpdate,
    deleteUSerById,
    createNewOrderForUser,
    getOrdersForUser,
    calculateTotalPriceForUser,
};
