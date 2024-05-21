import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    name: String,
    userID: String,
    email: String,
    service: String,
    beautician: String,
    selectedDate: String,
    time: String
})

const Usermodel = mongoose.model("appointments",UserSchema)

export default Usermodel