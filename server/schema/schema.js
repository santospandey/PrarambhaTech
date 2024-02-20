const { default: test } = require('node:test');
const { projects, clients } = require('../sampleData');
const { buildSchema } = require('graphql');

// Mongoose Model
const Project = require('../models/Project')
const Client = require('../models/Client');
const { default: mongoose } = require('mongoose');

// Construct a schema, using GraphQL schema language
const schema = buildSchema(`
input ClientInput {
    name: String
    email: String
    phone: String
}
input ProjectInput {
    clientId: String
    name: String
    description: String
    status: String
}
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
    client(id: String): Client
    clients: [Client]
    project(id: String): Project
    projects: [Project]
}
type Mutation {
    addClient(input: ClientInput): Client
    deleteClient(id: String): String
    addProject(input: ProjectInput): Project
    deleteProject(id: String): String
}`);

const rootValue = {
    client(args) {
        return Client.findOne({
            '_id': args.id
        })
    },
    clients: () => Client.find(),
    project: async (args) => {
        const project =  await Project.findOne({
            '_id': args.id
        });

        if(!project)
            return {};

        const clientId = project.clientId;
        const client = await Client.findOne({
            '_id': clientId
        });
        
        if(!client)
            return project;

        const output = {
            id: project.id,
            clientId: project.clientId,
            name: project.name,
            description: project.description,
            client: {
                id: clientId,
                name: client.name,
                email: client.email,
                phone: client.phone
            }
        }

        return output;
    },
    projects: () => Project.find(),
    addClient: (args) => {
        return new Client({
            name: args.input.name,
            email: args.input.email,
            phone: args.input.phone
        }).save();
    },
    deleteClient: (args) => {
        Client.deleteOne({ _id: args.id }).then((result) => {
            console.log('Deleted document:', result);
        }).catch((error) => {
            console.error('Error deleting document:', error);
        });
    },
    addProject: (args) => {
        return new Project({
            clientId: args.input.clientId,
            name: args.input.name,
            description: args.input.description,
            status: args.input.status,
        }).save();
    },
    deleteProject: (args) => {
        Project.deleteOne({ _id: args.id }).then((result) => {
            console.log('Deleted document:', result);
        }).catch((error) => {
            console.error('Error deleting document:', error);
        });
    }
}

module.exports = { schema, rootValue };