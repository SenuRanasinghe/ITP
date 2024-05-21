import Stripe from "stripe";
import dotenv from "dotenv";
import Order from "../models/order.model.js";
dotenv.config();
const stripe = Stripe(process.env.CHECKOUT_API_KEY_SECRET);

//create session for a oneItem
export const createOneSession = async (req, res) => {
    const item = req.body.item;
  
    const metadata = {
      userId: req.body.userId,
      items: item,
    };
  
    // Convert metadata to a JSON string
    const metadataString = JSON.stringify(metadata);
  
    // Truncate metadata if it exceeds 500 characters
    //const truncatedMetadata = metadataString.length > 500 ? metadataString.substring(0, 500) : metadataString;
  
    const customer = await stripe.customers.create({
      metadata: {
        userId: req.body.userId,
        Item: metadataString,
      },
    });
  
    const line_items = [
      {
        price_data: {
          currency: "lkr",
          product_data: {
            name: req.body.item.voucherName,
            description: req.body.item.description,
            metadata: {
              id: req.body.item._id,
            },
          },
          unit_amount: req.body.item.discountValue * 100, // Adjust unit amount to cents (multiply by 100)
        },
        quantity: 1, // Set the quantity to 1 for the single item
      },
    ];
  
    // Calculate the total amount
    const totalAmount = line_items.reduce(
      (acc, item) => acc + item.price_data.unit_amount * item.quantity,
      0
    );
  
    // Check if the total amount is less than 50 cents in USD
    if (totalAmount < 50) {
      return res
        .status(400)
        .send({ error: "Total amount must be at least 50 cents in USD." });
    }
  
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      shipping_address_collection: {
        allowed_countries: ["LK"],
      },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 0,
              currency: "lkr",
            },
            display_name: "Free Shipping",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 2,
              },
            },
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: {
              amount: 30000, // Adjusted amount to 500 cents (5 USD)
              currency: "lkr",
            },
            display_name: "One Day Delivery",
            delivery_estimate: {
              minimum: {
                unit: "business_day",
                value: 1,
              },
              maximum: {
                unit: "business_day",
                value: 1,
              },
            },
          },
        },
      ],
      phone_number_collection: {
        enabled: true,
      },
      customer: customer.userId,
      line_items,
      mode: "payment",
      success_url: `http://localhost:5173/pay-success`,
      cancel_url: `http://localhost:5173/cart`,
    });
  
    res.send({ url: session.url });
  };

//create order (save successful payments in databse)
const createOrder = async(customer,data)=>{
    const Items = JSON.parse(customer.metadata.Item);
    const newOrder = new Order({
      userId : customer.metadata.userId,
      paymentIntentId : data.payment_intent,
      Items : Items,
      customer_details:data.customer_details,
    });
  
    try {
      const savedOrder = await newOrder.save();
      console.log("Processed Order:",savedOrder);
    } catch (error) {
      console.log(error);
    }
  }
  

// This is Stripe CLI webhook secret for testing your endpoint locally.
let endpointSecret;

export const handleWebhook = async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let data;
  let eventType;

  if (endpointSecret) {
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
      console.log("Webhook verified!!");
    } catch (err) {
      console.log(`Webhook Error: ${err.message}`);
      res.status(400).send(`Webhook Error: ${err.message}`);
      return;
    }
    data = event.data.object;
    eventType = event.type;
  } else {
    data = req.body.data.object;
    eventType = req.body.type;
  }

  // Handle the event
  if (eventType === "checkout.session.completed") {
    stripe.customers
      .retrieve(data.customer)
      .then((customer) => {
        console.log(customer);
        console.log("data", data);
        createOrder(customer, data);
        
        console.log("Order created successfully!");

        // createOrder(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // Return a 200 response to acknowledge receipt of the event
  res.send().end();
};
