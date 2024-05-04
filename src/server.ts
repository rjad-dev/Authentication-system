import express from "express";
import { hostUrl, port, Database } from "./config";

class Server {
  app: express.Application
  constructor(){
    this.app = express();
    this.configuration();
  }

  private configuration() {
    this.app.use(express.json())
  }

  private async connect() {
    try {
      await Database.connection();
    } catch (error){
      throw new Error(error)
    }
  }

  public start() {
    this.connect()
    this.app.listen(port, () => {
      console.info(`App started at ${hostUrl}:${port}`)
    })
  }
}

const server = new Server();
server.start()