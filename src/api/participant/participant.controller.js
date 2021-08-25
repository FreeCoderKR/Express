import { Router } from "express";
import { UnauthorizedException } from "../../common/exceptions/unauthorized.exception.js";
import { wrap } from "../../lib/request-handler.js";
import { DocumentRepository } from "../documents/document.repository.js";
import { ParticipantRepository } from "./participant.repository.js";
import { ParticipantService } from "./participant.service.js";

export default class ParticipantController {
    path = "/participant";
    router = Router();

    participantService = new ParticipantService(
        new ParticipantRepository(),
        new DocumentRepository()
    );

    constructor() {
        this.initializeRoutes();
    }

    initializeRoutes() {
        const router = Router();

        router
            .post("/token", wrap(this.token))
            .get("/document", wrap(this.readDocument))
            .post("/sign", wrap(this.sign));

        this.router.use(this.path, router);
    }

    token = (req, res) => {
        const { documentId, email } = req.body;

        const [token, participant] = this.participantService.issueAccessToken({
            documentId,
            email,
        });
        req.session.email = participant.email;
        req.session.documentId = documentId;
        req.session.status = "participant";
        req.session.participantId = participant.id;

        return {
            token,
            participant,
        };
    };

    readDocument = (req, res) => {
        const status = req.session.status;
        const documentId = req.session.documentId;
        const participantId = req.session.id;
        if (status == "participant") {
            return this.participantService.readDocument(
                documentId,
                participantId
            );
        } else {
            throw new UnauthorizedException();
        }
    };

    sign = (req, res) => {
        const participantId = req.session.id;
        const signature = req.body.signature;
        if (!signature) {
            throw new BadRequestException("사인이 없습니다.");
        }
        if (status == "participant") {
            return this.participantService.signDocument(participantId);
        } else {
            throw new UnauthorizedException();
        }
    };
}
