import {QuickDB} from "quick.db";
import {defineEventHandler} from "h3";
import {readBody} from "h3";
import {randomBytes} from "crypto";

import dotenv from "dotenv";

dotenv.config(
    {
        path: "./server/api/admin/.env"
    }
);

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const db = new QuickDB();

    const token = db.table("adminTokens");

    console.log(body, process.env.ADMIN_PASSWORD, process.env.ADMIN_USERNAME);
    if (body.username === process.env.ADMIN_USERNAME && body.password === process.env.ADMIN_PASSWORD) {

        const tokenString = randomBytes(64).toString("hex");

        await token.set(tokenString, {expires: new Date().getTime() + 1000 * 60 * 60 * 8});

        event.node.res.setHeader("Set-Cookie", `access_token:${tokenString}; path=/; max-age=28800;`);

        return {
            success: true,
        }

    }
    return {
        success: false,
    }
});