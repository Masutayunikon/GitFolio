import {readBody} from "h3";
import {QuickDB} from "quick.db";

const db = new QuickDB();

export default defineEventHandler(async (event) => {
    // @ts-ignore
    const body = await readBody(event);

    const test = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
        body: JSON.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: body.code,
        }),
    });

    const data = await test.json();

    console.log(data);

    const user = await fetch("https://api.github.com/user", {
        headers: {
            "Authorization": `token ${data.access_token}`,
        }
    });

    const userData = await user.json();

    return {
        success: true,
    }
});