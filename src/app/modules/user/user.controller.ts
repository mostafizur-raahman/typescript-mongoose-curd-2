import { Request, Response } from "express";
import { UserServices } from "./user.service";
import bcrypt from "bcrypt";

const creatUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;
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
export const UserControllers = {
    creatUser,
    getAllUsers,
    getUserById,
};
