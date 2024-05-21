import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: {
        type: String,
        require: true,
      },
    paymentIntentId:{
        type :String,
    },
    Items: [
    {
      id: { type: String },
      name: { type: String },
      voucherCode:{type:String},
      price: { type: String },
      quantity: { type: Number },
    },
  ],
  customer_details: {
    address: {
      city: String,
      country: String,
      line1: String,
      line2: String,
      postal_code: String,
      state: String,
    },
    email: String,
    name: String,
    phone: String,
  },
},
{ timestamps: true });


const Order = mongoose.model("order", orderSchema);
export default Order;
