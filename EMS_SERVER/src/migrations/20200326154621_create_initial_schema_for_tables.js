exports.up = function (knex) {
  return knex.schema
    .createTable("users", (table) => {
      table.increments("id").primary();
      //refer to primary key of user
      table.integer("company_id").references("id").inTable("users");
      table.string("name", 120);
      table.string("email").unique();
      table.string("gender");
      table.string("company_name");
      table.string("department");
      table.string("password");
      table.string("address");
      table.string("city");
      table.string("state");
      table.string("country");
      table.string("mobile");
      table.string("profile_pic");
      table.boolean("is_active").defaultTo(true);
      table.string("user_type");
      table.timestamps(false, true);
    })

    .createTable("auth_table", (table) => {
      table.increments("id").primary();
      table.integer("user_id").references("id").inTable("users");
      //to handle single-device logins (perhaps, not the best way to do this)
      table.string("auth_token").comment("JWT for single-device logins");
      table.timestamps(false, true);
    });
};

exports.down = function (knex) {};
