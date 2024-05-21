import { Alert, Textarea, TextInput } from "flowbite-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";

export default function UpdateOrder() {
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const { orderId } = useParams();
  console.log(orderId);

  const navigate = useNavigate();

  //fetch relevant order using id
  useEffect(() => {
    if (orderId) {
      const fetchOrder = async () => {
        try {
          const res = await fetch(`/api/order/get-order/${orderId}`);
          const data = await res.json();
          if (!res.ok) {
            console.log(res);
            // Handle error response
          }
          if (res.ok) {
            console.log(data);
            setFormData(data);
          }
        } catch (error) {
          console.log(error.message);
          // Handle fetch error
        }
      };

      fetchOrder();
    }
  }, [orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/order/update/${formData._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate("/dashboard?tab=orders");
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">
        Update the order
      </h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Order Id:</label>
          <TextInput
            type="text"
            name="voucherName"
            value={formData._id}
            onChange={(e) => setFormData({ ...formData, _id: e.target.value })}
            readOnly
          />
        </div>
        <div>
          <label>Payment ID:</label>
          <TextInput
            type="text"
            name="Pay ID"
            value={formData.paymentIntentId}
            onChange={(e) =>
              setFormData({ ...formData, paymentIntentId: e.target.value })
            }
            readOnly
          />
        </div>

        {formData.Items && formData.Items.map((item, index) => (
        <div key={index}>
            <label>Voucher Name:</label>
            <TextInput
            name={`voucherName${index}`}
            value={item.name}
            onChange={(e) =>
                setFormData({
                ...formData,
                Items: formData.Items.map((it, idx) =>
                    idx === index ? { ...it, name: e.target.value } : it
                ),
                })
            }
            readOnly
            />
            <label>Voucher Price:</label>
            <TextInput
            name={`voucherPrice${index}`}
            value={item.price}
            onChange={(e) =>
                setFormData({
                ...formData,
                Items: formData.Items.map((it, idx) =>
                    idx === index ? { ...it, price: e.target.value } : it
                ),
                })
            }
            required
            />
        </div>
))}


        <div>
          <label>Customer Email:</label>
          <TextInput
            name="email"
            value={
              formData.customer_details ? formData.customer_details.email : ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                customer_details: {
                  ...formData.customer_details,
                  email: e.target.value,
                },
              })
            }
            required
          />
        </div>
        <div>
          <label>Customer Name:</label>
          <TextInput
            name="description"
            value={
              formData.customer_details ? formData.customer_details.name : ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                customer_details: {
                  ...formData.customer_details,
                  name: e.target.value,
                },
              })
            }
            required
          />
        </div>
        <div>
          <label>Customer phone:</label>
          <TextInput
            name="description"
            value={
              formData.customer_details ? formData.customer_details.phone : ""
            }
            onChange={(e) =>
              setFormData({
                ...formData,
                customer_details: {
                  ...formData.customer_details,
                  phone: e.target.value,
                },
              })
            }
            required
          />
        </div>

        <div className="w-full flex justify-center">
          <button className="bg-green-600 hover:bg-green-500 p-3 mt-3 rounded-xl text-white font-semibold px-80">
            Update
          </button>
        </div>
        {publishError && (
          <Alert className="mt-5" color="failure">
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
