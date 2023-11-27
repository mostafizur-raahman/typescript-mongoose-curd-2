import express, { Application, Request, Response } from "express";
import cors from "cors";
import { UserRoutes } from "./app/modules/user/user.routes";
const app: Application = express();
// parsers
app.use(express.json());
app.use(cors());
// applications route
app.use("/api", UserRoutes);
app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        status: "success",
        message: "Hello world",
    });
});
export default app;
