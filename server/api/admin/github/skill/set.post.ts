import {QuickDB} from "quick.db";

const db = new QuickDB();
const skills = db.table("skills");

export default defineEventHandler(async (event) => {

    const body = await readBody(event);

    await skills.set(body.skill, body.icon);

    return {
        success: true
    }

});