require('dotenv').config();
const colors = require('colors');
const cors = require('cors');
const { createHandler } = require('graphql-http/lib/use/express');
const { ruruHTML } = require('ruru/server');
const { schema, rootValue } = require('./schema/schema');
const connectDB  = require('./config/db');

const express = require('express');
const port = process.env.PORT || 5000;

const app = express();

app.use(cors())

// connect to database 
connectDB();

app.use('/_graphql', createHandler({
    schema: schema,
    rootValue: rootValue
}));

app.get('/graphql', (req, res) => {
    res.type("html");
    res.end(ruruHTML({ endpoint: "/_graphql" }))
});

app.listen(port, () => console.log(`Server is running in port ${port}`));