import {QuickDB} from "quick.db";

const db = new QuickDB();
const github = db.table("github");

export default defineEventHandler(async (event) => {

        const body = await readBody(event);

        const account = await github.get(body.id);

        if (!account) {
            return {
                success: false,
                error: "Account not found"
            }
        }

        await github.delete(body.id);

        return {
            success: true
        }

});