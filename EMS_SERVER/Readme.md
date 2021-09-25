# Instal node version 14 and pg version above 8 
- Because Knex and node have dependencies.
- [Node.JS v14 and pg package dependency issue](https://github.com/knex/knex/issues/3836)
- [Node.JS v14 and pg package dependency Issue Solved and it's explanation](https://github.com/brianc/node-postgres/issues/2170)



# Steps to run a project :  
1. Create Database on your local PostgreSql server with the name which you want to connect with this code.
2. run command `npm install` to install all dependencies.
3. Open path `node_modules\knex\bin\utils\cli-config-utils.js` and replace existing function `resolveDefaultKnexfilePath` with this :
    >>>
    function resolveDefaultKnexfilePath(extension) {
        return process.cwd() + `/db/knexfile.${extension}`;
    }
    >>>
4. Then run command `npx knex migrate:latest`, To run migrations.
5. Then start the app using `npm start` command.
6. Do not forget to import postman collection to explore apis.
    