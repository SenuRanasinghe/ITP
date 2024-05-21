import Order from "../models/order.model.js";
import { errorHandler } from "../utils/error.js";

//get all voucher details from database
export const getAllOrders = async (req, res, next) => {
    Order.find().then((order)=>{
      res.json(order);
    }).catch((error)=>{
        console.log(error);
    })
  }
  
  //get only one voucher details from databse
  export const getAOrder = async (req, res, next) => {
    try {
      const orderId = req.params.id;
      const order = await Order.findById(orderId);
      
      if (!order) {
          return res.status(404).json({ error: 'Order not found' });
      }
      
      res.json(order);    
  
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
  }
  }
  
  //update  the existing voucher in the database
  export const updateOrder = async (req, res) => {
    const orderId = req.params.id;

    console.log(req.body);

    const email = req.body.customer_details.email;
    const name = req.body.customer_details.name;
    const phone = req.body.customer_details.phone;

    // Validation
    if (!email || !name || !phone) {
        return res.status(400).json({ message: 'Email, name, and phone are required' });
    }

    const updateOrder = {
        'customer_details.email': email,
        'customer_details.name': name,
        'customer_details.phone': phone,
    };

    req.body.Items.forEach((item, index) => {
        updateOrder[`Items.${index}.price`] = item.price;
    });

    try {
        const updatedOrder = await Order.findByIdAndUpdate(orderId, updateOrder, { new: true });
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(updatedOrder);
    } catch (error) {
        console.error('Error updating order:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};
  
  
  //delete  a specific voucher from the database
  export const deleteOrder = async (req, res, next) => {
    let orderId = req.params.id;
      try {
          await Order.findByIdAndDelete(orderId);
          res.status(200).json('The Order has been deleted');
        } catch (error) {
          next(error);
        }
  }
  // get orders for single customer
  export const getOrdersByCustomerId = async (req, res, next) => {
    try {
      const customerId = req.params.id;
      const orders = await Order.find({ userId: customerId });
      
      res.json(orders);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  
  //testing route
  export const testOrder = (req, res) => {
      res.json({ msg: "Order route works" });// for postman testing purpose
  }