const merge = require('lodash/merge');
const get = require('lodash/get');

module.exports.withSchema = function(
  config,
  schema = get(config, 'connection.schema')
) {
  const originAfterCreate = get(config, 'pool.afterCreate');
  const newConfig = merge({}, config, {
    connection: {
      schema,
    },
    pool: {
      afterCreate(connection, callback) {
        connection.query(`SET SESSION SCHEMA '${schema}';`, function(error) {
          if (typeof originAfterCreate === 'function') {
            originAfterCreate(connection, callback);
            return;
          }
          callback(error, connection);
        });
      },
    },
  });
  return newConfig;
};

module.exports.schemaSeed = function(knex) {
  const schema = get(knex._context.client.config, 'connection.schema');

  return knex.schema.raw(`CREATE SCHEMA IF NOT EXISTS ${schema};`);
};
