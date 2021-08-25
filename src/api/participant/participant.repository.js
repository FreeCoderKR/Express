import { db } from "../../lib/database.js";
import { Participant } from "./entities/participant.entity.js";

export class ParticipantRepository {
    tableName = "participants";
    historyTableName = "participant_histories";
    historyinsertsql = [
        "INSERT INTO",
        this.historyTableName,
        "(participant_id, type, data, created_at)",
        "VALUES",
        "($participant_id, $type, $data, $created_at)",
    ].join(" ");

    findById(id) {
        const raw = db
            .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
            .get(id);
        return Participant.fromJson(raw);
    }

    findByDocumentIdAndEmail(documentId, email) {
        console.log(documentId);
        console.log(email);
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
        const now = new Date().toISOString();
        const create_result = db
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
        const history = {
            participant_id: raw.id,
            type: "CREATE",
            data: JSON.stringify(raw),
            created_at: now,
        };
        db.prepare(this.historyinsertsql).run(history);
        return create_result;
    }
    delete(documentId) {
        const now = new Date().toISOString();
        const delete_result = db
            .prepare(
                `UPDATE ${this.tableName} SET STATUS=?, updated_at=? WHERE document_id=?`
            )
            .run("DELETED", now, documentId);
        const results = this.findAllByDocumentId(documentId);
        results.forEach((result) => {
            const history = {
                participant_id: result.id,
                type: "DELETE",
                data: JSON.stringify({ status: "DELETED", updated_at: now }),
                created_at: now,
            };
            db.prepare(this.historyinsertsql).run(history);
        });
        return delete_result;
    }
    updateInvited(documentId) {
        const now = new Date().toISOString();
        const update_result = db
            .prepare(
                `UPDATE ${this.tableName} SET STATUS=?, updated_at=? WHERE document_id=?`
            )
            .run("INVITED", now, documentId);
        const results = this.findAllByDocumentId(documentId);
        results.forEach((result) => {
            const history = {
                participant_id: result.id,
                type: "INVITE",
                data: JSON.stringify({ status: "INVITED", updated_at: now }),
                created_at: now,
            };
            db.prepare(this.historyinsertsql).run(history);
        });

        return update_result;
    }
    readDocument(participantId) {
        const now = new Date().toISOString();

        const history = {
            participant_id: participantId,
            type: "READ_DOCUMENT",
            data: null,
            created_at: now,
        };
        return db.prepare(this.historyinsertsql).run(history);
    }
    signDocument(participantId) {
        const now = new Date().toISOString();
        const sign_result = db
            .prepare(
                `UPDATE ${this.tableName} SET STATUS=?, updated_at=? WHERE id=?`
            )
            .run("SIGNED", now, documentId);
        const history = {
            participant_id: participantId,
            type: "SIGN",
            data: JSON.stringify(raw),
            created_at: now,
        };
        db.prepare(this.historyinsertsql).run(history);
        return sign_result;
    }
}
