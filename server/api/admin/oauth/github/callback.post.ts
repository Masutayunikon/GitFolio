import {QuickDB} from "quick.db";

const db = new QuickDB();
const github = db.table("github");

export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    const oauth = await fetch("https://github.com/login/oauth/access_token", {
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

    const oauthData = await oauth.json();

    if (oauthData.error) {
        return {
            success: false,
            error: oauthData.error,
            error_description: oauthData.error_description,
        }
    }

    const user = await fetch("https://api.github.com/user", {
        headers: {
            Authorization: `token ${oauthData.access_token}`,
        }
    });

    const userData = await user.json();

    await github.set(userData.id.toString(), {
        username: userData.login,
        avatar: userData.avatar_url,
        access_token: oauthData.access_token,
        refresh_token: oauthData.refresh_token,
        expires: oauthData.expires_in,
        scope: oauthData.scope,
        token_type: oauthData.token_type,
        last_updated: Date.now(),
    });

    return {
        success: true
    }

});