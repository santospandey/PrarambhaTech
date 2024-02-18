const { default: test } = require('node:test');
const { projects, clients } = require('../sampleData');
const { buildSchema } = require('graphql');

// Mongoose Model
const Project = require('../models/Project')
const Client = require('../models/Client');
const { default: mongoose } = require('mongoose');

console.log("project ", Project);
console.log("Client ", Client);

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
type Client {
    id: String
    name: String
    email: String
    phone: String
}
type Project {
    id: String
    clientId: String
    name: String
    description: String
    status: String
    client: Client
}
type Query {
    client(ids: [String]): [Client]
    clients: [Client]
    project(ids: [String]): [Project]
    projects: [Project]
}`);

const rootValue = {
    client(args) {
        // return clients.filter(client => args.ids.indexOf(client.id) >= 0)
        return Client.find({
            '_id': { $in: args.ids.map(id => mongoose.Types.ObjectId(id)) }
        }, function (err, docs) {
            if (err) {
                console.error(err);
            } else {
                console.log(docs);
            }
        }) 
    },
    clients: () => Client.find(),
    project(args) {
        return Project.find({
            '_id': { $in: args.ids.map(id => mongoose.Types.ObjectId(id)) }
        }, function (err, docs) {
            if (err) {
                console.error(err);
            } else {
                console.log(docs);
            }
        })
        // return projects.filter(project => args.ids.indexOf(project.id) >= 0).map(project => {
        //     return {
        //         ...project,
        //         client: clients.find(client => client.id === project.clientId)
        //     }
        // })
    },
    projects: () => Project.find()
}

module.exports = { schema, rootValue };