import express from "express";
//import { Application } from "../../core/application.js";
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
const api = express.Router();
api.use((request, response, next) => {
    console.log('%s %s %s', request.method, request.url, request.path);
    next();
});
api.use("/q", (request, response, next) => {
    console.log("q");
    next();
});
api.use((request, response, next) => {
    response.send("API");
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
class Server //extends Application
 {
    constructor() {
        //super("home.json");
    }
    run() {
        const app = express();
        //app.use(express.static(this.configuration.server.www));
        app.use(express.static("public"));
        //app.use("/api", api);
        //app.listen(this.configuration.server.port);
    }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
export { Server };
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
app.get("/broker", (request, response) =>
    {
    //broker.publish("test/topic", "Hello depuis JS");

    response.send("HOME");
    });
*/
/*
app.get("/query", async (_request, response) =>
    {
    const result = await wiz.query();

    response.send(result);
    });

app.get("/red", async (_request, response) =>
    {
    const result = await wiz.setColor(255, 0, 0);

    response.send(result);
    });

*/
