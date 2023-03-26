import {QuickDB} from "quick.db";
import dotenv from "dotenv";
import * as querystring from "querystring";
import {refreshToken} from "~/server/github";

dotenv.config(
    {
        path: "./server/api/admin/.env"
    }
);

const db = new QuickDB();
const github = db.table("github");

export default defineEventHandler(async (event) => {
    let accounts = await github.all();

    const res = [];

    for (const account of accounts) {
        await refreshToken(account.id);
    }

    accounts = await github.all();
    for (const account of accounts) {
        let data;
        do {
            data = await fetch("https://api.github.com/user", {
                headers: {
                    "Authorization": `Bearer ${account.value.access_token}`
                }
            }).then(res => res.json());
        } while (data.message === "Bad credentials");


        res.push({
            id: account.id,
            username: data.login,
            avatar: data.avatar_url,
            description: data.bio,
        });
    }

    return {
        success: true,
        accounts: res
    }

});