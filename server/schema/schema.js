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
input ProjectUpdateInput {
    id: String
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
type Page {    
    current: Int
    total: Int
}
type ClientResult {
    page: Page
    data: [Client]
}
type Project {
    id: String
    clientId: String
    name: String
    description: String
    status: String
    client: Client
}
type ProjectResult {
    page: Page
    data: [Project]
}
type Query {
    client(id: String): Client
    clients(page: Int, limit: Int, query: String): ClientResult
    project(id: String): Project
    projects(page: Int, limit: Int): ProjectResult
}
type Mutation {
    addClient(input: ClientInput): Client
    deleteClient(id: String): String
    addProject(input: ProjectInput): Project
    updateProject(input: ProjectUpdateInput): Project
    deleteProject(id: String): String
}`);

const rootValue = {
    client(args) {
        return Client.findOne({
            '_id': args.id
        })
    },
    clients: async (args) => {
        const {page, limit, query} = args;
        let search = {};
        if(query.trim()){
            const regex = new RegExp(query, 'i');
            search['name'] = regex;
        }
        const startIndex = (page-1)*limit;    
        const clients = page === null || limit === null ? await Client.find({...search}) : await Client.find({...search}).limit(limit).skip(startIndex);
        const result = {};
        result['data'] = clients;
        result['page'] = page === null || limit === null ? {} : {
            current: page,
            total: Math.ceil(await Client.countDocuments()/limit)
        }
        return result;
    },
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
            status: project.status,
            client: {
                id: clientId,
                name: client.name,
                email: client.email,
                phone: client.phone
            }
        }

        return output;
    },
    projects: async (args) => {
        const {page, limit} = args;
        const startIndex = (page-1)*limit;
        const projects = await Project.find().limit(limit).skip(startIndex);
        const result = {};
        result['data'] = projects;
        result['page'] = {
            current: page,
            total: Math.ceil(await Project.countDocuments()/limit)
        }
        return result;
    },
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
    updateProject: (args) => {
        return Project.findOneAndUpdate(
            {_id: args.input.id},
            {name: args.input.name, status: args.input.status, description: args.input.description}
        );
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