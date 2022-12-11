import {readBody} from "h3";
import {QuickDB} from "quick.db";
import {githubApiCallHandler} from "~/server/api/github/githubUtils";


const db = new QuickDB();
const githubRepo = db.table("githubRepos");
const github = db.table("githubTokens");

export default defineEventHandler(async (event) => {

    const tokens = await github.all();

    const res = [];

    for (const token of tokens) {
        const reqData = await githubApiCallHandler("https://api.github.com/user/repos?", token.id, "GET", null, {
            visibility: "all",
            affiliation: "owner,collaborator,organization_member",
            sort: "updated",
            direction: "desc",
        });

        for (const repo of reqData.data) {
            const defaultConfig : any = {
                "owner": repo.owner.login,
                "name": repo.name,
                "display": false,
                "token": token.id,
            };
            if (!await githubRepo.has(repo.id.toString())) {
                await githubRepo.set(repo.id.toString(), defaultConfig);
            }
            res.push(repo);
        }
    }

    let Allconfig : {[k: string]: any} = {};

    for (const config of await githubRepo.all()) {
        const id = config.id;
        Allconfig[id] = config.value.display;
    }

    return {
        success: true,
        data: {
            repos: res,
            config: Allconfig,
        }
    }

});