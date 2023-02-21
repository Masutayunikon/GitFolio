import {QuickDB} from "quick.db";
import * as querystring from "querystring";
import { getRepositories, refreshToken } from "~/server/github";

const db = new QuickDB();
const github = db.table("github");

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

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

    const account: Account | null = await github.get(body.id);

    if (!account) {
        return {
            success: false,
            error: "Account not found"
        }
    }

    const repositories = await getRepositories(account.access_token);

    if (repositories.code === 401) {
        await refreshToken(body.id);
        const newAccount: Account | null = await github.get(body.id);
        if (!newAccount) {
            return {
                success: false,
                error: "Account not found"
            }
        }
        const newRepositories = await getRepositories(newAccount.access_token);

        if (newRepositories.error) {
            return {
                success: false,
                error: newRepositories.error
            }
        }

        return {
            success: true,
            repositories: newRepositories
        }
    }

    if (repositories.error) {
        return {
            success: false,
            error: repositories.error
        }
    }

    return {
        success: true,
        repositories: repositories
    }

});