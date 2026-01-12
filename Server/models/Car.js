import mongoose from "mongoose";

const {objectId} = mongoose.Schema.Types;

const carSchema = new mongoose.Schema({
    owner: {  type: objectId, ref: 'User',},
    brand: {type: String, required: true},
    model: {type: String, required: true},
    Image : {type: String, required: true},
    year: {type: Number, required: true},
    category: {type: String, required: true},
    seateCapacity: {type: Number, required: true},
    trasmission: {type: String, required: true},
    fuel_type: {type: String, required: true},
    price_per_day: {type: Number, required: true},
    location: {type: String, required: true},
    availability_status: {type: Boolean, default: true},
    description: {type: String, required: true},
}, {timestamps: true});

const Car = mongoose.model('Car', carSchema);
export default Car;