import mongoose from "mongoose";

const VoucherorderSchema = new mongoose.Schema({


     name: {
        type: String,
        require: true,
      },
     
      Code: {
        type: String,
        require: true,
      },
     
    
   
     
    
      
   
      uID: {
        type: String,
        require: true,
      },
   

  
},
{ timestamps: true });


const VoucherOrder = mongoose.model("Voucherorder", VoucherorderSchema);

export default VoucherOrder;
