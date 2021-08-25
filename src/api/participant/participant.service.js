import {
    BadRequestException,
    NotFoundException,
} from "../../common/exceptions/index.js";
import * as jwt from "../../lib/jwt.js";

const disableStatuses = Object.freeze(["CREATED", "DELETED"]);

export class ParticipantService {
    constructor(participantRepository, documentRepository) {
        this.participantRepository = participantRepository;
        this.documentRepository = documentRepository;
    }

    issueAccessToken({ documentId, email }) {
        const participant = this.participantRepository.findByDocumentIdAndEmail(
            documentId,
            email
        );

        if (!participant || disableStatuses.includes(participant.status)) {
            throw new NotFoundException("참가자 정보를 찾을 수 없습니다.");
        }

        const token = jwt.sign({
            participant_id: participant.id,
            email: participant.email,
        });

        return [token, participant.toJson()];
    }
    readDocument(documentId, participantId) {
        const document = this.documentRepository.findOne(documentId);
        const result = this.participantRepository.readDocument(participantId);
        if (result.changes == 1) {
            return { document: document.toSimpleJson() };
        } else {
            return false;
        }
    }
    signDocument(participantId) {
        const participant = this.participantRepository.findById(participantId);
        if (participant.status == "SIGNED") {
            throw new BadRequestException("이미 서명 했습니다.");
        }
        const result = this.participantRepository.signDocument(participantId);
        if (result.changes == 1) {
            return true;
        } else {
            return false;
        }
    }
}
