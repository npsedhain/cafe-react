const mutations = `
  createMenuItem(type: String!, name: String!, price: Float!, file: Upload): MenuItem!,
  updateMenuItem(_id: ID!, type: String!, name: String!, price: Float!, photo: String, file: Upload): MenuItem!,
  deleteMenuItem(_id: ID!): MenuItem
`;

module.exports = mutations;
