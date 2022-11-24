import querystring from "querystring";
import dotenv from "dotenv";

dotenv.config(
    {
        path: "./server/api/github/.env"
    }
);

export default defineEventHandler((event) => {
   return {
       success: true,
       data: {
            url: 'https://github.com/login/oauth/authorize?' + querystring.stringify({
                client_id: process.env.GITHUB_CLIENT_ID,
                redirect_uri: process.env.GITHUB_REDIRECT_URI,
            }),
       }
   }
});