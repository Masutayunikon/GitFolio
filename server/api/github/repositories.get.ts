import {QuickDB} from "quick.db";
import * as querystring from "querystring";
import { getRepositories, refreshToken } from "~/server/github";

const db = new QuickDB();
const github = db.table("github");
const repositories = db.table("repositories");

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

    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

    for (const account of accounts) {

        const repositories = await getRepositories(account.value.access_token);

        if (repositories.code === 401 || repositories.message === "Bad credentials") {
            console.log("Refreshing token");
            await refreshToken(account.id);
            let newAccount: Account | null = await github.get(account.id);

            while (newAccount && newAccount.access_token === account.value.access_token) {
                await sleep(1000);
                newAccount = await github.get(account.id);
            }
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

        if (repositories.error || repositories.message) {
            return {
                success: false,
                error: repositories.error || repositories.message
            }
        }

        res = res.concat(repositories);
    }

    type repo = {
        id: string;
        repository: {
            [key: string]: any
        }
        display: boolean;
    }

    for (let repository of res) {
        if (!await repositories.get(repository.id.toString())) {
            await repositories.set(repository.id.toString(), {
                repository: repository,
                display: true
            });
        }
    }

    return {
        success: true,
        repositories: await repositories.all()
    }

});