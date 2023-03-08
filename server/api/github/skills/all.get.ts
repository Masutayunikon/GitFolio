import {QuickDB} from "quick.db";

const db = new QuickDB();
const skills = db.table("skills");

export default defineEventHandler(async (event) => {

    return {
        success: true,
        skills: await skills.all()
    }

});