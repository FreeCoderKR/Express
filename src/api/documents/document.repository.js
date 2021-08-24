import { db } from "../../lib/database.js";
import { Document } from "./entities/document.entity";

export class DocumentRepository {
    tableName = "documents";
    historyTableName = "document_histories";

    findOne(id) {
        const raw = db
            .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
            .get(id);
        return Document.fromJson(raw);
    }
    findAll() {
        const raw = db.prepare(`SELECT * FROM ${this.tableName}`);
        return Document.fromJson(raw);
    }

    create(raw) {
        return db
            .prepare(
                [
                    "INSERT INTO",
                    this.tableName,
                    "(id, user_id, title, content, status, created_at, updated_at)",
                    "VALUES",
                    "($id, $userId, $title, $content, $status, $created_at, $updated_at)",
                ].join(" ")
            )
            .run(raw);
    }
    delete(id) {
        console.log(id);
        return db
            .prepare(`DELETE FROM ${this.tableName} WHERE id = ? `)
            .run(id);
    }
    updatePublish(id) {
        return db
            .prepare(`UPDATE ${this.tableName} SET STATUS=PUBLISH WHERE id=?`)
            .run(id);
    }
    insertDocumentHistory(raw) {
        const newraw = {
            document_id: raw.id,
            type: "CREATE",
            data: JSON.stringify(raw),
            created_at: raw.created_at,
        };
        return db
            .prepare(
                [
                    "INSERT INTO",
                    this.historyTableName,
                    "(document_id, type, data, created_at)",
                    "VALUES",
                    "($document_id, $type, $data, $created_at)",
                ].join(" ")
            )
            .run(newraw);
    }
}
