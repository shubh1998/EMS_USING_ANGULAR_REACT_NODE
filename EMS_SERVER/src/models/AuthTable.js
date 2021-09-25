"use strict";

//--------Import Objection Model--------
const Model = require("objection").Model;

class AuthTable extends Model {
  // Table name is the only required property
  static get tableName() {
    return "auth_table";
  }

  // Optional JSON schema.This is not the database schema! Nothing is generated
  // based on this. This is only used for validation. Whenever a model instance
  // is created it is checked against this schema. http://json-schema.org/.
  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
      },
    };
  }

  // This object defines the relations to other models.
  static get relationMappings() {
    return {
      //relation with "users" TABLE
      auth_user_relation: {
        relation: Model.HasOneRelation,
        // The related model. This can be either a Model subclass constructor or an
        // absolute file path to a module that exports one. We use the file path version
        // here to prevent require loops.
        modelClass: __dirname + "/User",
        join: {
          from: "auth_table.user_id",
          to: "users.id",
        },
      },
    };
  }
}

module.exports = AuthTable;
