const express = require("express");
const mongoose = require("mongoose");
const { ApolloServer, gql } = require("apollo-server-express");
require('dotenv').config()
const port = process.env.PORT
const jwt = require('jsonwebtoken');
const {SECRET_KEY} = require('./config/config');

const typeDefs = require("./graphql/schema"); 
const resolvers = require("./graphql/resolvers"); 
const models = require('./models');

const app = express();

// get the user info from a JWT
const getUser = token => {
  if (token) {
      try {
          // return the user information from the token
          return jwt.verify(token, SECRET_KEY);
      } catch (err) {
          // if there's a problem with the token, throw an error
          throw new Error('Session invalid');
      }
  }
};

const server = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization;
    // try to retrieve a user with the token
    const user = getUser(token);
    // for now, let's log the user to the console:
    console.log("here" + user);
    // add the db models and the user to the context
    return { models, user };
    } 
});

server.applyMiddleware({ app, path: '/api' });

app.get('/', (req, res) => res.send('Hello World'));

const config = require("./config/config.js");

mongoose.connect(config.url,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => app.listen({port}, () => console.log(`Listening on port ${port}!`)))
  .catch(error => {
    throw error
  })
  // 08/7