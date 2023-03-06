import {QuickDB} from "quick.db";
import {defineEventHandler} from "h3";
import {readBody} from "h3";
import {randomBytes} from "crypto";

export default defineEventHandler(async (event) => {

    const db = new QuickDB();

    const tables = [
        'tokens',
        'github',
        'repositories',
    ];

    let res = 0;

    for (let table of tables) {
        const tmp = await db.table(table);

        res += await tmp.deleteAll();
    }

    return {
        success: res,
    }
});