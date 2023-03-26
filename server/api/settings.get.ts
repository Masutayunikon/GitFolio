import {QuickDB} from "quick.db";

const db = new QuickDB();
const config = db.table("gitfolio");

export default defineEventHandler(async (event) => {

    const configuration = await config.get("config");

    if (!configuration) {
        config.set("config", {

        })
    }
});