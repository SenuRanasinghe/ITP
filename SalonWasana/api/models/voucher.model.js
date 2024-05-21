import mongoose from "mongoose";

const voucherSchema = new mongoose.Schema({
    voucherName: {
        type: String,
        required: true
    },
    voucherCode: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    discountType: {
        type: String,
        enum: ['percentage', 'fixed'],
        required: true
    },
    discountValue: {
        type: Number,
        required: true
    },
    
    isActive: {
        type: Boolean,
        default: true 
    }
}, { timestamps: true });

const Voucher = mongoose.model("voucher", voucherSchema);
export default Voucher;
