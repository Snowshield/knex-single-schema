# knex-single-schema
Add support of database schema to knex config file.

### Installation

**NPM**
```
npm -i knex-single-schema
```

**Yarn**
```
yarn add knex-single-schema
```

### Quick start

**knexfile.js**
```
const { withSchema } = require('knex-single-schema');

// Declare schema name in connection options.
module.exports = withSchema({
  client: 'pg',
  connection: {
    database: 'database',
    schema: 'myschema', // New option by this plugin
    user: 'user',
    password: 'password',
    charset: 'utf8',
  },
});

// Or via second argument of withSchema.
module.exports = withSchema({
  client: 'pg',
  connection: {
    database: 'database',
    user: 'user',
    password: 'password',
    charset: 'utf8',
  },
}, 'myschema');
```

### Schema seed

You may want to create schema in database automatically. Function `schemaSeed` solves this case. It internally calls `CREATE SCHEMA IF NOT EXISTS` for schema declared in `knexfile.js`.

Create new [knex seed file](https://knexjs.org/#Seeds-API) and name it `schema.js`.

**<your knex seeds directory>/schema.js**
```
const { schemaSeed } = require('knex-single-schema');

exports.seed = schemaSeed;
```

Now you can create schema with knex CLI command in project directory.
```
knex seed:make schema.js
```

### License
MIT
