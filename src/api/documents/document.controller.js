import { Router } from "express";
import { wrap } from "../../lib/request-handler.js";

export default class DocumentController {
  path = "/documents";
  router = Router();

  constructor() {
    this.initializeRoutes();
  }

  initializeRoutes() {
    const router = Router();

    router
      .post("/", wrap(this.create))
      .get("/", wrap(this.findAll))
      .get("/:documentId", wrap(this.findOne))
      .delete("/:documentId", wrap(this.remove))
      .post("/:documentId/publish", wrap(this.publish));

    this.router.use(this.path, router);
  }

  create = (req, res) => {
    throw new Error("Method not implemented.");
  };

  findOne = (req, res) => {
    throw new Error("Method not implemented.");
  };

  findAll = (req, res) => {
    throw new Error("Method not implemented.");
  };

  publish = (req, res) => {
    throw new Error("Method not implemented.");
  };

  remove = (req, res) => {
    throw new Error("Method not implemented.");
  };
}
