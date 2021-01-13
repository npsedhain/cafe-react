const menuItemMutations = require('./menuItemMutations');

const mutations = `
  type Mutation {
    ${menuItemMutations}
  }
`;

module.exports = mutations;
