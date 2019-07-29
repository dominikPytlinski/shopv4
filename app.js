const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const cors = require('cors');

require('dotenv').config();

const typeDefs = fs.readFileSync('./graphql/Schema.graphql', { encoding: 'utf-8' });
const resolvers = require('./graphql/Resolvers');

const app = express();

app.use(cors());

const server = new ApolloServer({
    typeDefs,
    resolvers
});

server.applyMiddleware({app});

const PORT = process.env.PORT || 4000;

app.use(bodyParser.json());

mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@cluster0-kszkn.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, { useNewUrlParser: true })
    .then(
        app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
    )
    .catch(
        err => console.log(err)
    );