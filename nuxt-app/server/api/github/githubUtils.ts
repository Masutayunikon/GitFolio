import {QuickDB} from "quick.db";
import querystring from "querystring";


const db = new QuickDB();
const github = db.table("githubTokens");


// @ts-ignore
export async function githubApiCallHandler (url: string, userId: string, method: string, body: object|null, query: any) {

    // @ts-ignore
    const userDbData: object = await github.get(userId);

    const req = await fetch(url + (query ? querystring.stringify(query) : ''), {
        method: method,
        headers: {
            // @ts-ignore
            'Authorization': 'Bearer ' + userDbData.access_token,
            'Content-Type': 'application/json'
        },
        body: body ? JSON.stringify(body) : null,
    });

    const data = await req.json();
    return {
        req: req,
        data: data
    }
}
