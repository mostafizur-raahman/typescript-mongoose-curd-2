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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_model_1 = require("../user.model");
const createUserIntoDB = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.create(user);
    return result;
});
const getAllUsersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.find();
    return result;
});
const getUSerByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.findOne({ userId: id });
    return result;
});
const deleteUSerByIdFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.UserModel.deleteOne({
        userId: id,
    });
    return result;
});
const getUserByIdAndUpdateFromDB = (userId, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.UserModel.findOneAndUpdate({ userId: userId }, { $set: updatedData }, { new: true });
        return result;
    }
    catch (error) {
        console.error("Error updating user in database:", error);
    }
});
const createNewOrderForUserInDB = (userId, orderData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield user_model_1.UserModel.findOneAndUpdate({ userId: userId }, { $push: { orders: orderData } }, { new: true });
        return result;
    }
    catch (error) {
        throw new Error(`Failed to create order for user: ${error.message}`);
    }
});
const getOrdersForUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ userId: userId });
        return user ? user.orders : null;
    }
    catch (error) {
        throw new Error(`Failed to get orders for user: ${error.message}`);
    }
});
const calculateTotalPriceForUserFromDB = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_model_1.UserModel.findOne({ userId: userId });
        if (user) {
            const totalPrice = user.orders.reduce((sum, order) => sum + order.price * order.quantity, 0);
            return totalPrice;
        }
        else {
            return null;
        }
    }
    catch (error) {
        throw new Error(`Failed to calculate total price for user: ${error.message}`);
    }
});
exports.UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUSerByIdFromDB,
    getUserByIdAndUpdateFromDB,
    deleteUSerByIdFromDB,
    createNewOrderForUserInDB,
    getOrdersForUserFromDB,
    calculateTotalPriceForUserFromDB,
};
