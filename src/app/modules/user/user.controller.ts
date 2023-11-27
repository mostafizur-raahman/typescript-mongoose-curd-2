import { Request, Response } from "express";
import { UserServices } from "./user.service";
import bcrypt from "bcrypt";
const creatUser = async (req: Request, res: Response) => {
    try {
        const user = req.body;

        // // will call service func to create
        // const result = await UserServices.createUserIntoDB(user);
        // // send response
        // res.status(200).json({
        //     success: true,
        //     message: "User created successfully!",
        //     data: result,
        // });
        const hashedPassword = await bcrypt.hash(user.password, 12);

        // Replace the user's plain password with the hashed password
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
            message: "Failed to create user!",
        });
    }
};

export const UserControllers = {
    creatUser,
};
