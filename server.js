import express, { response } from "express";
import bcrypt from "bcrypt-nodejs";
import cors from "cors";
import knex from "knex";
import { handleRegister } from "./controllers/register.js";
import { handleImage } from "./controllers/image.js";
import { handleGetProfile } from "./controllers/getProfile.js";
import { handleSignin } from "./controllers/signin.js";

const app = express();
app.use(express.json());
app.use(cors());

const db = knex({
    client: "pg",
    connection: {
        host: "127.0.0.1",
        port: 5432,
        user: "postgres",
        password: "admin",
        database: "smartbrain",
    },
});

app.get("/", (req, res) => {
    res.json("success");
});

app.post("/signin", handleSignin(db, bcrypt));

app.post("/register", handleRegister(db, bcrypt));

app.put("/image", handleImage(db));

app.get("/profile/:id", handleGetProfile(db));

// const PORT = process.env.PORT

app.listen(3000, () => {
    console.log(`Server Running on port 3000`);
});
