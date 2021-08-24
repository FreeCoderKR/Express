import { db } from "../../lib/database.js";
import { Document } from "./entities/document.entity";

export class DocumentRepository {
  tableName = "documents";
  historyTableName = "document_histories";
  historyinsertsql = `INSERT INTO ${this.historyTableName} (document_id, type, data, created_at) VALUES ($document_id, $type, $data, $created_at)`;

  findOne(id) {
    const raw = db
      .prepare(`SELECT * FROM ${this.tableName} WHERE id = ?`)
      .get(id);
    return Document.fromJson(raw);
  }
  findAll(offset, size) {
    var rows = db
      .prepare(`SELECT * FROM ${this.tableName} LIMIT ? OFFSET ?`)
      .all(offset, size);

    rows = rows.map((row) => Document.fromJson(row));
    return rows;
  }

  create(raw) {
    const now = new Date().toISOString();
    const create_result = db
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
    const history = {
      document_id: raw.id,
      type: "CREATE",
      data: JSON.stringify(raw),
      created_at: now,
    };
    db.prepare(this.historyinsertsql).run(history);
    return create_result;
  }
  delete(id) {
    const now = new Date().toISOString();
    const delete_result = db
      .prepare(`UPDATE ${this.tableName} SET status=?, updated_at=? WHERE id=?`)
      .run("DELETED", now, id);
    const history = {
      document_id: id,
      type: "DELETE",
      data: JSON.stringify({ status: "DELETED", updated_at: now }),
      created_at: now,
    };
    db.prepare(this.historyinsertsql).run(history);
    return delete_result;
  }
  updatePublish(id) {
    const now = new Date().toISOString();
    const update_result = db
      .prepare(
        `UPDATE ${this.tableName} SET STATUS=?, updated_at=?  WHERE id=?`
      )
      .run("PUBLISHED", now, id);
    const history = {
      document_id: id,
      type: "PUBLISH",
      data: JSON.stringify({ status: "PUBLISHED", updated_at: now }),
      created_at: now,
    };
    db.prepare(this.historyinsertsql).run(history);
    return update_result;
  }
}
