import {QuickDB} from "quick.db";
import {githubApiCallHandler} from "~/server/api/github/githubUtils";

const db = new QuickDB();
const github = db.table("githubTokens");

export default defineEventHandler(async (event) => {
    let accounts = [];
    for (const token of await github.all()) {
        // get github users id from db and get user info
        const reqData = await githubApiCallHandler("https://api.github.com/user?", token.id, "GET", null, null);
        accounts.push(reqData.data);
    }
    return {
        success: true,
        data: {
            accounts: accounts,
        },
    }
});