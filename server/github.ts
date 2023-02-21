import {QuickDB} from "quick.db";
import * as querystring from "querystring";
import dotenv from "dotenv";

dotenv.config(
    {
        path: "./server/api/admin/.env"
    }
);

const db = new QuickDB();
const github = db.table("github");

export async function refreshToken(id: string) {

    interface Account {
        username: string;
        avatar: string;
        access_token: string;
        refresh_token: string;
        expires: number;
        scope: string;
        token_type: string;
        last_updated: number;
    }

    const account : Account|null = await github.get(id);

    if (!account) {
        return {
            success: false,
            error: "Account not found"
        }
    }

    const refresh = await fetch("https://github.com/login/oauth/access_token?" + querystring.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        refresh_token: account.refresh_token,
        grant_type: "refresh_token",
    }), {
        method: "POST",
        headers: {
            "Accept": "application/json",
        }
    })

    const refreshData = await refresh.json();

    if (refreshData.error) {
        return {
            success: false,
            error: refreshData.error,
            error_description: refreshData.error_description,
        }
    }

    await github.set(id, {
        username: account.username,
        avatar: account.avatar,
        access_token: refreshData.access_token,
        refresh_token: refreshData.refresh_token,
        expires: refreshData.expires_in,
        scope: refreshData.scope,
        token_type: refreshData.token_type,
        last_updated: Date.now(),
    });

    return {
        success: true
    }
}

export async function getRepositories(access_token: string) {
    const repositories = await fetch(`https://api.github.com/user/repos?` + querystring.stringify({
        visibility: "all",
        affiliation: "owner,collaborator,organization_member",
        sort: "updated",
        direction: "desc",
    }), {
        method: "GET",
        headers: {
            'Authorization': `Bearer ${access_token}`,
            'Content-Type': 'application/vnd.github+json'
        }
    });

    console.log(repositories);

    return await repositories.json();
}


