import mongoose from "mongoose";

const FeedbacksSchema = new mongoose.Schema({
    Email: String,
    Service: String,
    Feedback: String,
    ProductID: String,
    UserID: String,
    userName: String
})

const FeedbacksModel = mongoose.model("feedbacks", FeedbacksSchema)
export default FeedbacksModel
