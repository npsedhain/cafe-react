const { buildSchema } = require('graphql');

const types = require('./types');
const queries = require('./queries');
const mutations = require('./mutations');

const GQLSchema = buildSchema(`
${types}

${queries}

${mutations}
`);

module.exports = GQLSchema;
