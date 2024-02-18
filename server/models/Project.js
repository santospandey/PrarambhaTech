const { mongoose, Schema } = require("mongoose");

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

module.exports = mongoose.model('ProjectSchema', Project)