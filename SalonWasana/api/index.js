import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

//application routes
import userRoute from "./routes/user.js"
import voucherRoute from "./routes/voucher.route.js"
import payRoute from "./routes/pay.route.js"
import orderRoute from "./routes/order.route.js"
import employeeRoute from "./routes/employee.route.js"
import servicesRoute from "./routes/services.route.js"
import feedbackRoute from "./routes/feedBack.route.js"
import appointmenrRoute from "./routes/appointment.route.js"
import courseRoute from "./routes/course.route.js"
import inventoryRoute from "./routes/inventory.route.js"


dotenv.config();

mongoose.connect(process.env.MONGO).then(()=>{
    console.log('Connected to MongoDB')
}).catch((err)=>{
    console.log(err)
});

const app = express();
app.use(cookieParser());
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:5173',
  };

app.use(cors(corsOptions));

app.listen(3000 ,() =>{
    console.log('Server Listning on port 3000')
});

app.use("/api/user",userRoute); 
app.use("/api/voucher",voucherRoute);
app.use("/api/stripe",payRoute);
app.use("/api/order",orderRoute);
app.use("/api/employee",employeeRoute);
app.use("/api/service",servicesRoute);
app.use("/api/feedback",feedbackRoute);
app.use("/api/appointment",appointmenrRoute);
app.use("/api/course",courseRoute);
app.use("/api/inventory",inventoryRoute);


app.use((err,req,res,next)=>{
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    return res.status(statusCode).json({
        success:false,
        message,
        statusCode
    });
})
