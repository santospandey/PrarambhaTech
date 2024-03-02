import mongoose, { Schema } from "mongoose"

const Client = new Schema({
    name: String,
    email: String,
    phone: String
});

export default mongoose.model('ClientSchema', Client);