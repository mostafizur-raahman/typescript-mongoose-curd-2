import { Schema, model, connect } from "mongoose";
import { User } from "./user/user.interface";
const userSchema = new Schema<User>({});
