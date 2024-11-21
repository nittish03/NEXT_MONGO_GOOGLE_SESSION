import mongoose from "mongoose";
;

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI as string);
        console.log(`MongoDB Connected: ${mongoose.connection.host}`);
        
        
    } catch (error) {
        console.error((error as Error).message);
        process.exit(1);
    }
}

export default connectDb;

