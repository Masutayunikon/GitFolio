import {sendError, sendRedirect} from "h3";
import {createError, navigateTo} from "#app";
import {defineEventHandler} from "h3";
import {QuickDB} from "quick.db";

const db = new QuickDB();
const token = db.table("adminTokens");

export default defineEventHandler(async (event) => {

    const authorizedRoutes = [
        "/admin/login",
        "/api/admin/display",
        "/api/admin/login",
        "/api/github/login",
        "/api/github/callback",
        "/api/github/url",
        "/api/github/repos",
    ]

    const clientSideRoutes = event.node.req.url?.startsWith("/admin") || event.node.req.url?.startsWith("/api");
    // check if url is in authorized routes
    if (clientSideRoutes && !authorizedRoutes.includes(<string>event.node.req.url)) {
        const cookie = event.node.req.headers.cookie?.split(";").map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith("access_token"))?.split(":")[1];
        if (!cookie) {
            return sendRedirect(event, "/admin/login");
        }
        const tokenData : any = await token.get(cookie);
        if (!tokenData) {
            return sendRedirect(event, "/admin/login");
        }
        if (tokenData && tokenData.expires && tokenData.expires < new Date().getTime()) {
            return sendRedirect(event, "/admin/login");
        }
    }
});