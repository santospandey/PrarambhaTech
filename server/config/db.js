const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL,
            { useNewUrlParser: true, useUnifiedTopology: true })

        console.log(`MongoDB connected: ${connection.connection.host}`.cyan.underline.bold);
    } catch (ex) {
        console.error(`Error in connecting mongodb ${ex}`);
    }
}

module.exports = connectDB;