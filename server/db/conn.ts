import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URL,
            { autoIndex: true, autoCreate: true })

        console.log(`MongoDB connected: ${connection.connection.host}`);
    } catch (ex) {
        console.error(`Error in connecting mongodb ${ex}`);
    }
}

export default connectDB;