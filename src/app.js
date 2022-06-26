const cors = require("cors");
const env = require("dotenv");
const path = require("path");
const express = require("express");
const Server = require("./infra/server/server");
const cluster = require("cluster");
const expressFormidable = require("express-formidable");
const TokenHandler = require("./application/security/TokenHandler");
const AuthContrller = require("./interfaces/controllers/AuthController");
const LessonController = require("./interfaces/controllers/LessonControllr");
const UploadController = require("./interfaces/controllers/uploadImageController");
const QuizController = require("./interfaces/controllers/QuizController");

const totalCPUs = require("os").cpus().length;
// app configration
const app = express();
env.config();
const server = new Server(app, null, process.env.PORT_NUMBER);

// middlewares
const middlewares = [
    cors(),
    expressFormidable({
        encoding: "utf-8",
        uploadDir: path.resolve(__dirname, "public"),
        multiples: true
    })
];

// controllers
const controllers = [
    new AuthContrller(TokenHandler),
    new LessonController(TokenHandler),
    new UploadController(TokenHandler),
    new QuizController(TokenHandler)
];

// start app
Promise.resolve().then(() => {
    server.loadMiddlewares(middlewares);
    server.loadControllers(controllers);
    if (cluster.isMaster) {
        console.log(`Number of CPUs is ${totalCPUs}`);
        console.log(`Master ${process.pid} is running`);

        // Fork workers.
        for (let i = 0; i < totalCPUs; i++) {
            cluster.fork();
        }

        cluster.on("exit", (worker, code, signal) => {
            console.log(`worker ${worker.process.pid} died`);
            console.log("Let's fork another worker!");
            cluster.fork();
        });
    } else {
        server.run();
    }
});
