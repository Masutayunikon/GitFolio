import {QuickDB} from "quick.db";

const db = new QuickDB();
const githubRepo = db.table("githubRepos");
export default defineEventHandler(async (event) => {
    const body = await readBody(event);

    if (body.display === true || body.display === false) {
        const config: any = await githubRepo.get(body.id.toString());
        if (config) {
            if (config.display !== body.display) {
                await githubRepo.set(body.id.toString() + ".display", body.display);
            }

            const newConfig: any = await githubRepo.get(body.id.toString());

            return {
                success: true,
                data: {
                    config: newConfig,
                }
            }
        }
    }
    return {
        success: false,
        data: {
            error: "Invalid config"
        }
    }
});