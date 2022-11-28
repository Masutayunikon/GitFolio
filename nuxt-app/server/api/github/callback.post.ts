import {readBody} from "h3";
import {QuickDB} from "quick.db";

const db = new QuickDB();
const github = db.table("githubTokens");

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

    const user = await fetch("https://api.github.com/user", {
        headers: {
            "Authorization": `token ${data.access_token}`,
        },
    });

    const userData = await user.json();

    if (user.status === 200) {
        data["created_time"] = new Date().getTime();
        const id = userData.id.toString();

        if (await github.has(id)) {
            await github.set(id, data);
        } else {
            await github.add(id, data);
        }

        return {
            success: true,
        };
    } else {
        return {
            success: false,
            data: {
                error: "Invalid token",
            },
        };
    }
});