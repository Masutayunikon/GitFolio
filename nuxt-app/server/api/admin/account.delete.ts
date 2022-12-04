import {QuickDB} from "quick.db";
import {readBody} from "h3";

export default defineEventHandler(async (event) => {
    // get the account id from the event
    const body = await readBody(event);
    // get the database
    const db = new QuickDB();
    // get the accounts table
    const accounts = db.table("githubTokens");
    const repos = db.table("githubRepos");
    // delete the account
    if (await accounts.delete(body.id.toString())) {
        // delete all repos that are linked to the account
        for (const repo of await repos.all()) {
            if (repo.value.token === body.id.toString()) {
                await repos.delete(repo.id);
            }
        }
        return {
            success: true,
            data: {
                message: "Account deleted successfully",
            },
        }
    } else {
        return {
            success: false,
            data: {
                message: "Account not found",
            },
        }
    }

});