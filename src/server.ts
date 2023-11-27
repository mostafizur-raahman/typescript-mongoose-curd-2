import app from "./app";
import mongoose from "mongoose";
import config from "./app/config";
async function server() {
    try {
        await mongoose.connect(config.database_url as string);
        // mongodb+srv://<username>:<password>@cluster0.jm9b2up.mongodb.net/?retryWrites=true&w=majority
        // ts-mongoose
        //vr8egaUsua5JyWr8
        console.log("connected mongoDB...");
        app.listen(process.env.PORT, () => {
            console.log(`Example app listening on port ${config.port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

server().catch((err) => console.log(err));
