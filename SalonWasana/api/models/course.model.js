import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    
    courseName: String,
    coursePrice: Number,
    courseDescription: String,
    courseDuration: String

})

const UserModel = mongoose.model("courses", UserSchema)

export default UserModel
