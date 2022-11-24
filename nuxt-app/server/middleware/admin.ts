import {sendError, sendRedirect} from "h3";
import {createError, navigateTo} from "#app";

export default defineEventHandler(async (event) => {
   // @ts-ignore
    const clientSideRoutes = event.node.req.url.startsWith("/admin");

    console.log("lol", event.node.req.url);
    if (event.node.req.url === "/admin/login")
        return;
    if (!clientSideRoutes) {
        return;
    } else if (!event.node.req.headers.authorization) {
        await  sendRedirect(event, "/admin/login");
        return;
    } else {
        return;
    }
});