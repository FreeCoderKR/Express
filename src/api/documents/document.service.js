import { NotFoundException } from "../../common/exceptions/index.js";
import * as jwt from "../../lib/jwt.js";
import { v4 as uuidv4 } from "uuid";

// const disableStatuses = Object.freeze(["CREATED", "DELETED"]);

export class DocumentService {
    constructor(documentRepository, participantRepository) {
        this.documentRepository = documentRepository;
        this.participantRepository = participantRepository;
    }

    createDocument(title, content, userId, participants) {
        console.log("create");
        const id = uuidv4();
        const now = new Date().toISOString();
        const document_input = {
            id,
            userId,
            title,
            content,
            status: "CREATED",
            created_at: now,
            updated_at: now,
        };

        this.documentRepository.create(document_input);
        this.documentRepository.insertDocumentHistory(document_input);
        participants.forEach((element) => {
            const { name, email } = element;
            if (!name || !email) {
                throw new BadRequestException(
                    "참가자는 모두의 이름과 이메일이 기입되어있어야 합니다."
                );
            }
            const participantId = uuidv4();
            const participant_input = {
                id: participantId,
                documentId: id,
                name,
                email,
                status: "CREATED",
                created_at: now,
                updated_at: now,
            };
            this.participantRepository.create(participant_input);
        });
        return id;
    }
    readAllDocument() {
        // const result = this.documentRepository.findAll();
        // console.log(result);
    }
    readDocument(userId, documentId) {
        if (documentId == null || documentId == "") {
            throw new NotFoundException();
        }

        const document = this.documentRepository.findOne(documentId);

        if (!document) {
            throw new NotFoundException();
        } else {
            if (userId != document.userId || !userId) {
                throw new ForbiddenException();
            }
            const participants =
                this.participantRepository.findAllByDocumentId(documentId);
            document.participants = participants.map((participant) =>
                participant.toJson()
            );
            return document;
        }
    }
    removeDocument(id) {
        const result = this.documentRepository.delete(id);
        if (result.changes == 1) {
            return true;
        } else {
            return false;
        }
    }
    publishDocument(id) {
        const result = this.documentRepository.updatePublish(id);
        if (result.changes == 1) {
            this.participantRepository.updateInvited(id);
            return true;
        } else {
            return false;
        }
    }
}
