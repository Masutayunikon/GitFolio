import {QuickDB} from "quick.db";
import * as querystring from "querystring";
import config from "~/server/config.json";


const db = new QuickDB();
const repositories = db.table("repositories");

export default defineEventHandler(async (event) => {

    type Repository = {
        id: string;
        value: {
            [key: string]: any
        }
    }

    const configuration: {
     languages: {[keys: string]: string},
     skills: {[key: string]: string}[]
    } = config;


    const repos: Repository[]|null = await repositories.all();


    if (!repos) {
        return {
            success: true,
            repositories: []
        }
    }

    const res : {language: string, icons: string[]}[] = [];

    let skills : string[] = [];

    for (const repo of repos) {
        if (repo.value.repository.language) {
            if (configuration.languages[repo.value.repository.language]) {
                skills.push(configuration.languages[repo.value.repository.language]);
            } else {
                skills.push(repo.value.repository.language);
            }
        }
    }

    skills =  [...new Set(skills)];

    for (const skill in skills) {

        let icons = await fetch(`https://api.iconify.design/search?` + querystring.stringify({
            query: skills[skill] + " palette=true",
        }));

        let json = await icons.json();

        if (!json.icons.length) {
            icons = await fetch(`https://api.iconify.design/search?` + querystring.stringify({
                query: skills[skill],
                limit: 10
            }));

            json = await icons.json();
        }
        res.push({
            language: skills[skill],
            icons: json.icons
        })
    }


    for (let skill of configuration.skills) {
        res.push({
            language: skill.language,
            icons: [skill.icons]
        });
    }

    return {
        success: true,
        skills: res
    }

});