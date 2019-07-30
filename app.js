const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { ApolloServer, gql } = require('apollo-server-express');
const fs = require('fs');
const cors = require('cors');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})
const upload = multer({ storage: storage });

require('dotenv').config();

const typeDefs = fs.readFileSync('./graphql/Schema.graphql', { encoding: 'utf-8' });
const resolvers = require('./graphql/Resolvers');

const app = express();

app.use(cors());

app.use('/upload', upload.single('img'), (req, res, next) => {
    res.status(200).json({ path: `http://localhost:4000/uploads/${req.file.originalname}` });
});

app.use('/uploads', express.static('uploads'));

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