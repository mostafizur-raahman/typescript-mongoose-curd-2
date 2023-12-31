import { UserModel } from "../user.model";
import { Order, User } from "./user.interface";
const createUserIntoDB = async (user: User) => {
    const result = await UserModel.create(user);
    return result;
};

const getAllUsersFromDB = async () => {
    const result = await UserModel.find();
    return result;
};

const getUSerByIdFromDB = async (id: string) => {
    const result = await UserModel.findOne({ userId: id });
    return result;
};
const deleteUSerByIdFromDB = async (id: string) => {
    const result = await UserModel.deleteOne({
        userId: id,
    });
    return result;
};
const getUserByIdAndUpdateFromDB = async (
    userId: string,
    updatedData: Partial<User>
) => {
    try {
        const result = await UserModel.findOneAndUpdate(
            { userId: userId },
            { $set: updatedData },
            { new: true }
        );
        return result;
    } catch (error) {
        console.error("Error updating user in database:", error);
    }
};

const createNewOrderForUserInDB = async (userId: string, orderData: Order) => {
    try {
        const result = await UserModel.findOneAndUpdate(
            { userId: userId },
            { $push: { orders: orderData } },
            { new: true }
        );

        return result;
    } catch (error: any) {
        throw new Error(`Failed to create order for user: ${error.message}`);
    }
};
const getOrdersForUserFromDB = async (userId: string) => {
    try {
        const user = await UserModel.findOne({ userId: userId });
        return user ? user.orders : null;
    } catch (error: any) {
        throw new Error(`Failed to get orders for user: ${error.message}`);
    }
};
const calculateTotalPriceForUserFromDB = async (userId: string) => {
    try {
        const user = await UserModel.findOne({ userId: userId });

        if (user) {
            const totalPrice = user.orders.reduce(
                (sum, order: Order) => sum + order.price * order.quantity,
                0
            );
            return totalPrice;
        } else {
            return null;
        }
    } catch (error: any) {
        throw new Error(
            `Failed to calculate total price for user: ${error.message}`
        );
    }
};
export const UserServices = {
    createUserIntoDB,
    getAllUsersFromDB,
    getUSerByIdFromDB,
    getUserByIdAndUpdateFromDB,
    deleteUSerByIdFromDB,
    createNewOrderForUserInDB,
    getOrdersForUserFromDB,
    calculateTotalPriceForUserFromDB,
};
