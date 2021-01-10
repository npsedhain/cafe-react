const express = require('express');
const { graphqlHTTP } = require('express-graphql');

const { buildSchema } = require('graphql');

const app = express();

require('dotenv/config');

const schema = buildSchema(`
  type Query {
    returnString: String
  }
`);

const rootValue = {
  returnString: () => 'Some String'
};

app.use(
  '/cafe',
  graphqlHTTP({
    schema,
    rootValue,
    graphiql: true
  })
);

app.listen(4000, () => {
  console.log('Server running at port', process.env.PORT);
});
