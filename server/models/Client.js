const { mongoose, Schema } = require("mongoose");

const Client = new Schema({
    name: String,
    email: String,
    phone: String
});

module.exports = mongoose.model('ClientSchema', Client)