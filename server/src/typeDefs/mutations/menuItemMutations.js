const mutations = `type Mutation {
  createMenuItem(type: String!, name: String!, price: Float!, photo: String): MenuItem,
  updateMenuItem(_id: ID!, type: String, name: String, price: Float, photo: String): MenuItem,
  deleteMenuItem(_id: ID!): MenuItem
}`;

module.exports = mutations;
