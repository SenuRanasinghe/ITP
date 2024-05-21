import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name:String,
    description:String,
    quantity:Number,
    price:String,
    imageUrl:String,
    category:String,
    supplierid:String,
    suppliername:String

})

const ProductModel = mongoose.model("managers",productSchema)
export default ProductModel
