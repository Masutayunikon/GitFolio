import {QuickDB} from "quick.db";
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

    if (repositories.code === 401 || repositories.message === "Bad credentials") {
        await refreshToken(body.id);
        const newAccount: Account | null = await github.get(body.id);
        if (!newAccount) {
            return {
                success: false,
                error: "Account not found"
            }
        }
        const newRepositories = await getRepositories(newAccount.access_token);

        if (newRepositories.error || newRepositories.message) {
            return {
                success: false,
                error: newRepositories.error || newRepositories.message
            }
        }

        return {
            success: true,
            repositories: newRepositories
        }
    }

    if (repositories.error || repositories.message) {
        return {
            success: false,
            error: repositories.error || repositories.message
        }
    }

    return {
        success: true,
        repositories: repositories
    }

});