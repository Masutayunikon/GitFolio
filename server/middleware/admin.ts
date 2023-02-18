import {sendError, sendRedirect} from "h3";
import {defineEventHandler} from "h3";
import {QuickDB} from "quick.db";

const db = new QuickDB();
const token = db.table("tokens");

export default defineEventHandler(async (event) => {

    const clientSideRoutes = event.node.req.url?.startsWith("/admin") && !event.node.req.url?.startsWith("/admin/login");

    if (!clientSideRoutes)
        return;


    const cookie: string | undefined = event.node.req.headers.cookie;

    if (cookie) {
        const userToken: string | null = cookie.split(";").reduce((token: string | null, currentCookie) => {
            const cookie = currentCookie.trim();
            if (cookie.startsWith("access-token=")) {
                return cookie.split("=")[1];
            }
            return null;
        }, null);

        if (userToken && await token.get(userToken))
            return;
    }
    return sendRedirect(event, "/admin/login");
});