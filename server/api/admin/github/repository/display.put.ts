import {QuickDB} from "quick.db";

const db = new QuickDB();
const repositories = db.table("repositories");

export default defineEventHandler(async (event) => {

    type repo = {
        id: string;
        repository: {
            [key: string]: any
        }
        display: boolean;
    }

    const body = await readBody(event);

    const repo : repo|null = await repositories.get(body.id.toString());

    if (!repo) {
        return {
            success: false,
            error: "Repository not found"
        }
    }

    await repositories.set(body.id.toString(), {
        repository: repo.repository,
        display: body.display
    })

    return {
        success: true
    }

});