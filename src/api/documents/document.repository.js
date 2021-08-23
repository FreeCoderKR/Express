import { db } from "../../lib/database.js";
import { Document } from "./entities/document.entity";

export class documentRepository {
  tableName = "documents";

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
}
