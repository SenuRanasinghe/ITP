import mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
    ServiceID: String, 
    ServiceType: String, 
    ServiceName: String, 
    Description: String, 
    Price: Number,
    Image: String,
},{timestamps: true});


const ServiceModel = mongoose.model("services", ServiceSchema)
export default ServiceModel