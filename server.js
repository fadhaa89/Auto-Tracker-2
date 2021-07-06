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