import {githubApiCallHandler} from "~/server/api/github/githubUtils";
import {QuickDB} from "quick.db";

const db = new QuickDB();
const githubRepo = db.table("githubRepos");

export default defineEventHandler(async (event) => {

    let result = [];

    for (const repo of await githubRepo.all()) {
        if (repo.value.display) {
            const reqData = await githubApiCallHandler("https://api.github.com/repos/" + repo.value.owner + "/" + repo.value.name, repo.value.token, "GET", null, null);
            result.push(reqData.data);
        }
    }

    return {
        success: true,
        data: result,
    }
});