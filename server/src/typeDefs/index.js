const { gql } = require('apollo-server-express');

const types = require('./types');
const queries = require('./queries');
const mutations = require('./mutations');

const GQLSchema = gql(`
${types}

${queries}

${mutations}
`);

module.exports = GQLSchema;
