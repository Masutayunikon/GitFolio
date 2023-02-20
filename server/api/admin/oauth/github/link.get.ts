
import {defineEventHandler} from "h3";
import dotenv from "dotenv";
import * as querystring from "querystring";

dotenv.config(
    {
        path: "./server/api/admin/.env"
    }
);

export default defineEventHandler(async (event) => {

    return {
        success: true,
        url: 'https://github.com/login/oauth/authorize?' + querystring.stringify({
            client_id: process.env.GITHUB_CLIENT_ID,
            redirect_uri: process.env.GITHUB_REDIRECT_URI,
        })
    }

});