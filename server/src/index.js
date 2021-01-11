const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const app = express();

require('dotenv/config');

app.use(
  '/cafe',
  graphqlHTTP({
    schema: typeDefs,
    rootValue: resolvers,
    graphiql: true
  })
);

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
