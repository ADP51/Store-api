const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const fs = require("fs");
const db = require("./db");
const app = express();
const expressJwt = require('express-jwt');
const jwt = require('jsonwebtoken');
const port = process.env.PORT || 8080;

const jwtSecret = Buffer.from('shhhhhhared-secret', 'base64');

const typeDefs = fs.readFileSync('./schema.graphql', {encoding: 'utf-8'});
const resolvers = require("./resolvers");

app.use(cors(), bodyParser.json(), expressJwt({
  secret: jwtSecret,
  credentialsRequired: false
}));

const graphqlServer = new ApolloServer({typeDefs, resolvers, introspection: true,
  playground: true});
graphqlServer.applyMiddleware({app});





app.listen(port, () => console.log(`Server is running on port ${port}`));
