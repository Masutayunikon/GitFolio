import {QuickDB} from "quick.db";
import * as querystring from "querystring";
import { getRepositories, refreshToken } from "~/server/github";

const db = new QuickDB();
const github = db.table("github");

export default defineEventHandler(async (event) => {

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

    interface AccountDb {
        id: string;
        value: {
            username: string;
            avatar: string;
            access_token: string;
            refresh_token: string;
            expires: number;
            scope: string;
            token_type: string;
            last_updated: number;
        }
    }

    const accounts: AccountDb[]|null = await github.all();

    if (!accounts) {
        return {
            success: true,
            repositories: []
        }
    }

    type AnyObj = {
        [key: string]: any
    }

    let res : AnyObj[] = [];

    for (const account of accounts) {

        const repositories = await getRepositories(account.value.access_token);

        if (repositories.code === 401) {
            await refreshToken(account.id);
            const newAccount: Account | null = await github.get(account.id);
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

            res = res.concat(newRepositories);
        }

        if (repositories.error) {
            return {
                success: false,
                error: repositories.error
            }
        }

        res = res.concat(repositories);
    }

    return {
        success: true,
        repositories: res
    }

});