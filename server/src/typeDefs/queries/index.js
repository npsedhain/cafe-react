const menuItemQueries = require('./menuItemQueries');

const queries = `type Query {
  ${menuItemQueries},
}`;

module.exports = queries;
