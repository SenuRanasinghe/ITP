import mongoose from "mongoose";

const EmployeeSchema = new mongoose.Schema({
    EmployeeName: String,
    Email: String,
    Age: Number,
    Address: String,
    ContactNumber: Number,
    Description: String,
    EmployeeImage: String,
    BasicSalary: Number,
})

const EmployeeModel = mongoose.model("employees", EmployeeSchema)
export default EmployeeModel