export default defineEventHandler((event) => {
    // @ts-ignore
    console.log("lol", event.res);

    return {
        success: true,
    }
});