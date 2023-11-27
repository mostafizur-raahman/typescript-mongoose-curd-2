import { Request, Response } from "express";
import { UserServices } from "./user.service";
import bcrypt from "bcrypt";
import { joiStudentValidator } from "./user.validation";
const creatUser = async (req: Request, res: Response) => {
    try {
        // creating schema validation using joi
        const user = req.body;

        const { error } = joiStudentValidator.validate(user);

        if (error) {
            res.status(404).json({
                success: false,
                error: {
                    code: 404,
                    error: error.details,
                },
            });
        }

        const hashedPassword = await bcrypt.hash(user.password, 12);
        const userWithHashedPassword = {
            ...user,
            password: hashedPassword,
        };

        // Call service func to create
        const result = await UserServices.createUserIntoDB(
            userWithHashedPassword
        );

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
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
};

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await UserServices.getAllUsersFromDB();
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
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
};
const getUserById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const result = await UserServices.getUSerByIdFromDB(userId);

        res.status(200).json({
            success: true,
            message: "Users fetched successfully!",
            data: result,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: "User not found",
            error: {
                code: 404,
                description: "User not found!",
            },
        });
    }
};
const getUserByIdAndUpdate = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        const updatedData = req.body;

        const result = await UserServices.getUserByIdAndUpdateFromDB(
            userId,
            updatedData
        );

        if (result) {
            return res.status(200).json({
                success: true,
                message: "User updated successfully!",
                data: result,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: {
                code: 500,
                description: "Internal Server Error",
            },
        });
    }
};
const deleteUSerById = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({
                success: false,
                message: "User ID is required for the delete.",
            });
        }

        const result = await UserServices.deleteUSerByIdFromDB(userId);

        if (result.deletedCount > 0) {
            return res.status(200).json({
                success: true,
                message: "User deleted successfully!",
                data: null,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: {
                code: 500,
                description: "Internal Server Error",
            },
        });
    }
};
const createNewOrderForUser = async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const orderData = req.body;

        const result = await UserServices.createNewOrderForUserInDB(
            userId,
            orderData
        );

        if (result) {
            return res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: null,
            });
        } else {
            return res.status(404).json({
                success: false,
                message: "User not found",
                error: {
                    code: 404,
                    description: "User not found!",
                },
            });
        }
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error: {
                code: 500,
                description: "Internal Server Error",
            },
        });
    }
};

export const UserControllers = {
    creatUser,
    getAllUsers,
    getUserById,
    getUserByIdAndUpdate,
    deleteUSerById,
    createNewOrderForUser,
};
