const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const bodyParser = require('body-parser');
const { makeExecutableSchema } = require('graphql-tools');
const cors = require('cors');
const fs = require("fs");
const db = require("./db");
const app = express();
const port = process.env.PORT || 8080;

const typeDefs = fs.readFileSync('./schema.graphql', {encoding: 'utf-8'});
const resolvers = require("./resolvers");

app.use(cors(), bodyParser.json());
const graphqlServer = new ApolloServer({typeDefs, resolvers});
graphqlServer.applyMiddleware({app});





app.listen(port, () => console.log(`Server is running on port ${port}`));
