class Server {
  #app;
  #database;
  #port;
  constructor(app, database, port = 3000) {
    this.#app = app;
    this.#database = database;
    this.#port = port;
  }

  run = () => {
    return this.#app.listen(this.#port, () => {
      console.log(`server listen on port ${this.#port}`);
    });
  };

  loadMiddlewares = (middlewares) => {
    middlewares.forEach((middleware) => this.#app.use(middleware));
  };

  loadControllers = (controllers) => {
    controllers.forEach((controller) => {
      this.#app.use(controller.path, controller.setRoutes());
    });
  };

  //   initDatabase = () => {};
}

module.exports = Server;
