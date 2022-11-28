import {readBody} from "h3";
import {QuickDB} from "quick.db";
import {githubApiCallHandler} from "~/server/api/github/githubUtils";


const db = new QuickDB();
const githubRepo = db.table("githubRepos");

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    const reqData = await githubApiCallHandler("https://api.github.com/user/repos?", body.id.toString(), "GET", null, {
        visibility: "all",
        affiliation: "owner,collaborator,organization_member",
        sort: "updated",
        direction: "desc",
    });

    for (const repo of reqData.data) {
        const defaultConfig : any = {
            "display": true,
        };
        if (!await githubRepo.has(repo.id.toString())) {
            await githubRepo.add(repo.id.toString(), defaultConfig);
        }
    }

    return {
        success: true,
        data: reqData.data,
    }

});