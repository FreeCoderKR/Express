import { Router } from "express";
import { BadRequestException } from "../../common/exceptions/bad-request.exception.js";
import { ForbiddenException } from "../../common/exceptions/forbidden.exception.js";
import { NotFoundException } from "../../common/exceptions/not-found.exception.js";
import { wrap } from "../../lib/request-handler.js";
import { ParticipantRepository } from "../participant/participant.repository.js";
import { DocumentRepository } from "./document.repository.js";
import { DocumentService } from "./document.service.js";
import { Document } from "./entities/document.entity.js";

export default class DocumentController {
    path = "/documents";
    router = Router();
    documentService = new DocumentService(
        new DocumentRepository(),
        new ParticipantRepository()
    );
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

    create = async (req, res) => {
        const { title, content, participants } = req.body;

        //제목, 내용, 참가자 이름, 이메일 필수, 이메일형식,
        if (!title) {
            throw new BadRequestException("문서 제목은 필수입니다.");
        }

        if (!content) {
            throw new BadRequestException("문서 내용은 필수입니다.");
        }
        if (participants.length < 2 || participants.length > 10) {
            throw new BadRequestException("참가자는 최소 2명, 최대 10명입니다");
        }
        const userId = req.session.id;

        const newId = this.documentService.createDocument(
            title,
            content,
            userId,
            participants
        );
        return { documentId: newId };
    };

    findOne = (req, res) => {
        const documentId = req.params.documentId;
        const userId = req.session.id;
        const document = this.documentService.readDocument(userId, documentId);
        return document.toJson();
    };

    findAll = (req, res) => {
        throw new Error("Method not implemented.");
    };

    publish = (req, res) => {
        const documentId = req.params.documentId;
        const userId = req.session.id;
        const document = this.documentService.readDocument(userId, documentId);
        if (document.status != "CREATED") {
            throw new BadRequestException(
                "CREATED 상태의 문서만 배포 가능합니다."
            );
        }
        return this.documentService.publishDocument(documentId);
    };

    remove = (req, res) => {
        const documentId = req.params.documentId;
        const userId = req.session.id;
        const document = this.documentService.readDocument(userId, documentId);
        if (document.status != "CREATED") {
            throw new BadRequestException(
                "CREATED 상태의 문서만 삭제 가능합니다."
            );
        }
        return this.documentService.removeDocument(documentId);
    };
}
