const Methods = require("./endpointMethods");
const router = require("express").Router();

class Controller {
    constructor() {
        if (new.target === Controller)
            throw new Error("abstract class can't be instantiated");

        this.router = router;
        this.path = "";
        this.routes = [];
    }

    setRoutes = () => {
        for (const route of this.routes) {
            for (const middleware of route.localMiddleware) {
                this.router.use(route.path, middleware);
            }

            switch (route.method) {
                case Methods.GET:
                    this.router.get(`${this.path}${route.path}`, route.handler);
                    break;
                case Methods.POST:
                    this.router.post(
                        `${this.path}${route.path}`,
                        route.handler
                    );
                    break;
                case Methods.PUT:
                    this.router.put(`${this.path}${route.path}`, route.handler);
                    break;
                case Methods.DELETE:
                    this.router.delete(
                        `${this.path}${route.path}`,
                        route.handler
                    );
                    break;
                default:
                    console.log("not a valid method");
                    break;
            }
        }

        return this.router;
    };

    sendSuccess(res, data, message) {
        return res.status(200).json({
            message: message || "success",
            data: data
        });
    }

    sendError(res, message) {
        return res.status(500).json({
            statusCode: 500,
            message: message || "internal server error"
        });
    }
}

module.exports = Controller;
