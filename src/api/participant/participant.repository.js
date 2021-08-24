import { db } from "../../lib/database.js";
import { Participant } from "./entities/participant.entity.js";

export class ParticipantRepository {
    tableName = "participants";
    historyTableName = "participant_histories";
    findById(id) {
        const raw = db
            .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
            .get(id);
        return Participant.fromJson(raw);
    }

    findByDocumentIdAndEmail(documentId, email) {
        const raw = db
            .prepare(
                `SELECT * FROM ${this.tableName} WHERE document_id = ? and email = ?`
            )
            .get(documentId, email);

        return Participant.fromJson(raw);
    }
    findAllByDocumentId(documentId) {
        var rows = db
            .prepare(`SELECT * FROM ${this.tableName} WHERE document_id = ? `)
            .all(documentId);
        rows = rows.map((row) => Participant.fromJson(row));
        return rows;
    }
    create(raw) {
        return db
            .prepare(
                [
                    "INSERT INTO",
                    this.tableName,
                    "(id, document_id, name, email, status, created_at, updated_at)",
                    "VALUES",
                    "($id, $documentId, $name, $email, $status, $created_at, $updated_at)",
                ].join(" ")
            )
            .run(raw);
    }
    updateInvited(documentId) {
        return db
            .prepare(
                `UPDATE ${this.tableName} SET STATUS=INVITED WHERE document_id=?`
            )
            .run(documentId);
    }
    insertParticipantHistory(raw) {
        const newraw = {
            participant_id: raw.id,
            type: "CREATE",
            data: JSON.stringify(raw),
            created_at: raw.created_at,
        };
        return db
            .prepare(
                [
                    "INSERT INTO",
                    this.historyTableName,
                    "(participant_id, type, data, created_at)",
                    "VALUES",
                    "($participant_id, $type, $data, $created_at)",
                ].join(" ")
            )
            .run(newraw);
    }
}
