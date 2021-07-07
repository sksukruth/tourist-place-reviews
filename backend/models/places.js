import mongoose from 'mongoose'

const placeSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    location:{
        type:String,
        required: true
    },
    image:{
        type:String,
        required: true
    }
})

const Place = mongoose.model('place',placeSchema);

export default Place;