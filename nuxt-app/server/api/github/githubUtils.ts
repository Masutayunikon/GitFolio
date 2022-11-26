import {QuickDB} from "quick.db";
import querystring from "querystring";


const db = new QuickDB();
const github = db.table("githubTokens");


// @ts-ignore
export async function githubApiCallHandler (url: string, userId: string, method: string, body: object|null, query: any) {

    // @ts-ignore
    const userDbData: object = await github.get(userId);

    // @ts-ignore
    console.log("USERDB", userDbData.access_token);

    const req = await fetch(url + (query ? querystring.stringify(query) : ''), {
        method: method,
        headers: {
            // @ts-ignore
            'Authorization': 'Bearer ' + userDbData.access_token,
            'Content-Type': 'application/vnd.github+json'
        },
        body: body ? JSON.stringify(body) : null,
    });

    if (req.status === 401) {
        // @ts-ignore
        // @ts-ignore
        const refresh = await fetch("https://github.com/login/oauth/access_token?" + querystring.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            // @ts-ignore
            refresh_token: userDbData.refresh_token,
            grant_type: "refresh_token",
        }), {
            method: "POST",
            headers: {
                "Accept": "application/json",
            }
        })

        const refreshData = await refresh.json();

        if (refresh.status === 200) {
            // @ts-ignore
            await github.set(userId, refreshData);
            // @ts-ignore
            return githubApiCallHandler(url, userId, method, body, query);
        }

    }

    const data = await req.json();
    return {
        req: req,
        data: data
    }
}
