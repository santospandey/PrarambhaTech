import mongoose, { Schema } from "mongoose"

const Project = new Schema({
    clientId: {
        type: Schema.Types.ObjectId,
        ref: 'Client'
    },
    name: String,
    description: String,
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
    }
});

export default mongoose.model('ProjectSchema', Project);