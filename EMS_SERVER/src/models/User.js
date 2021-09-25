"use strict";

const Model = require("objection").Model;

const bcrypt = require("bcrypt");
const validator = require("validator");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const config = require("../../config");


class User extends Model {
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      // required: ["name", "email", "password", "mobile", "gender"],
      required: [],
      properties: {
        id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        email: { type: "string", minLength: 1, maxLength: 255 },
        gender: { type: "string" },
        company_name: { type: "string" },
        department: { type: "string" },
        password: { type: "string" },
        address: { type: "string", minLength: 1, maxLength: 500 },
        city: { type: "string" },
        state: { type: "string" },
        country: { type: "string" },
        mobile: { type: "string", maxLength: 10 },
        profile_pic: { type: "string" },
      },
    };
  }

  static get relationMappings() {
    return {
      // relation with "city" Table
      // user_city_relation: {
      //     relation: Model.HasOneRelation,
      //     modelClass: City,
      //     join: {
      //         to: "users.city_id",
      //         from: "city.id"
      //     }
      // },
    };
  }

  //--------Function is used to generate auth_token------------
  async getJWT() {
    return await jwt.sign(
      {
        id: this.id,
        role: this.user_type,
      },
      config.JWT_SECRET
    );
  }

  //---------Function to compare password----------------------
  async comparePassword(password) {
    if (!password) {
      return false;
    }
    let pass = await bcrypt.compare(password, this.password);
    return pass;
  }

  //---------Function runs before inserting a record----------------------
  //-----It checks valid emailId and bcrypt the password-----
  async $beforeInsert() {
    await super.$beforeInsert();
    if (this.email) {
      if (!validator.isEmail(this.email || "")) {
        throw badRequestError("Not a valid email address!");
      }
    }
    if (this.password) {
      this.password = await bcrypt.hash(this.password, 10);
    }
  }
}

module.exports = User;
