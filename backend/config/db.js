import dotenv from "dotenv"
dotenv.config();


import mongoose from 'mongoose'

const connectDB = async() => {
    const url = process.env.TOURREVIEWS_DB_URI || 'mongodb+srv://user-123:user-123@mini-mern-tut.9ap4n.mongodb.net/historical_places?retryWrites=true&w=majority'
    //console.log(process.env.TOURREVIEWS_DB_URI)
    try {
        await mongoose.connect(url,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MONGODB Connection SUCCESS');
        
    } catch (error) {
        console.error('MONGODB connection ERROR');
        process.exit(1);
    }
}

export default connectDB;