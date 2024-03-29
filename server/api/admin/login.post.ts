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

    const token = db.table("tokens");

    if (body.username === process.env.GITFOLIO_USERNAME && body.password === process.env.GITFOLIO_PASSWORD) {

        const tokenString = randomBytes(64).toString("hex");

        try {
            await token.set(tokenString, {expires: new Date().getTime() + 1000 * 60 * 60 * 8});
        } catch (e) {
            console.log(e);
        }

        const tokens = await token.all();


        for (const cookie of tokens) {
            if (cookie.value.expires < new Date().getTime()) {
                try {
                    await token.delete(cookie.id);
                } catch (e) {
                    console.log(e);
                }
            }
        }

        event.node.res.setHeader("Set-Cookie", `access-token=${tokenString}; path=/; max-age=28800;`);

        return {
            success: true,
        }

    }
    return {
        success: false,
        data: {
            error: "Invalid username or password"
        }
    }
});