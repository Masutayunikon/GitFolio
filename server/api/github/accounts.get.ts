import {QuickDB} from "quick.db";
import dotenv from "dotenv";
import * as querystring from "querystring";

dotenv.config(
    {
        path: "./server/api/admin/.env"
    }
);

const db = new QuickDB();
const github = db.table("github");

export default defineEventHandler(async (event) => {
    const accounts = await github.all();

    const res = [];

    for (const account of accounts) {
        res.push({
            id: account.id,
            username: account.value.username,
            avatar: account.value.avatar
        })
    }

    return {
        success: true,
        accounts: res
    }

});