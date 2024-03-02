import Client from "./models/Client.js";
import Project from "./models/Project.js"
import mongoose from "mongoose";

const resolvers = {
  Query: {
    client: async (_, args) => {
      console.log(args);
      return await Client.findOne({
        '_id':  args.id
      })
    },
    clients: async (_, args) => {
      const { page, limit, query } = args;
      let search = {};
      if (query) {
        const regex = new RegExp(query, 'i');
        search['name'] = regex;
      }
      const startIndex = (page - 1) * limit;
      const clients = page === null || limit === null ? await Client.find({ ...search }) : await Client.find({ ...search }).limit(limit).skip(startIndex);
      const result = {};
      result['data'] = clients;
      result['page'] = (!page || !limit) ? {} : {
        current: page,
        total: Math.ceil(await Client.countDocuments() / limit)
      }
      return result;
    },
    project: async (_, args) => {
      const project = await Project.findOne({
        '_id': args.id
      });
      if (!project)
        return {};

      const clientId = project.clientId;
      const client = await Client.findOne({
        '_id': clientId
      });

      if (!client)
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
    projects: async (_, args) => {
      const { page, limit } = args;
      const startIndex = (page - 1) * limit;
      const projects = await Project.find().limit(limit).skip(startIndex);
      const result = {};
      result['data'] = projects;
      result['page'] = {
        current: page,
        total: Math.ceil(await Project.countDocuments() / limit)
      }
      return result;
    }
  },
  Mutation: {
    addClient: async (_, args) => {
      return await new Client({
        name: args.input.name,
        email: args.input.email,
        phone: args.input.phone
      }).save();
    },
    deleteClient: async (_, args) => {
      const client = await Client.findOne({ '_id': args.id });
      if (!client) {
        return null;
      }
      const result = await Client.deleteOne({ _id: args.id });
      if (result && result.deletedCount > 0) {
        return client;
      }
      return null;
    },
    addProject: async (_, args) => {
      return await new Project({
        clientId: args.input.clientId,
        name: args.input.name,
        description: args.input.description,
        status: args.input.status,
      }).save();
    },
    updateProject: async (_, args) => {
      console.log("update project ", args);
      return await Project.findOneAndUpdate(
        { _id: args.input.id },
        { name: args.input.name, status: args.input.status, description: args.input.description }
      );
    },
    deleteProject: async (_, args) => {
      const project = await Project.findOne({'_id': args.id});
      if(!project){
        return null;
      }
      const result = Project.deleteOne({ _id: args.id });
      if(result && (await result).deletedCount > 0){
        return project;
      }
      return null;
    }
  }
}

export default resolvers;