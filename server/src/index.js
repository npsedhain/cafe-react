const cors = require('cors');
const express = require('express');
const mongoose = require('mongoose');
const { ApolloServer } = require('apollo-server-express');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const app = express();

require('dotenv/config');

app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

mongoose.connect(process.env.CAFE_REACT_CONNECTION, { useUnifiedTopology: true, useNewUrlParser: true }, (err, db) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Connected to db at port,', 4000);
});

app.listen(4000, () => {
  console.log('Server running at port', 4000);
});
