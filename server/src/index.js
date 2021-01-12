const cors = require('cors');
const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { graphqlUploadExpress } = require('graphql-upload');

const mongoose = require('mongoose');

const typeDefs = require('./typeDefs');
const resolvers = require('./resolvers');

const app = express();

require('dotenv/config');

app.use(cors());
app.use(
  '/cafe',
  graphqlUploadExpress({ maxFileSize: 100000, maxFiles: 1 }),
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
