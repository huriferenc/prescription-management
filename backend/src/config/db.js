import mongoose from 'mongoose';

export const connectDb = async () => {
    try {
        // Connect and create database named "prescriptions_db"
        await mongoose.connect(process.env.DB_URI);
        console.log('DB CONNECTED SUCCESSFULLY!');
    } catch (error) {
        console.error('Error connecting to DB!', error);
        process.exit(1);
    }
};
