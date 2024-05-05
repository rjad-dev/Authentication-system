import express from "express";
import { hostUrl, port, Database } from "./config";
import { ProxyRouter as ProxyRouterUser } from "./api/routes";
import morgan from "morgan";
class Server {
  app: express.Application;
  constructor() {
    this.app = express();
    this.configuration();
  }

  private configuration() {
    this.app.use(express.json());
    this.app.use(morgan("dev"));
    this.app.use("/authentication-system/api/v1/", ProxyRouterUser.map());
  }

  private async connect() {
    try {
      await Database.connection();
    } catch (error) {
      throw new Error(error);
    }
  }

  public start() {
    this.connect();
    this.app.listen(port, () => {
      console.info(`App started at ${hostUrl}:${port}`);
    });
  }
}

const server = new Server();
server.start();
