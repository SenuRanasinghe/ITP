import { Alert, Select, Textarea, TextInput} from "flowbite-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AddVoucher() {
  const [formData, setFormData] = useState({
    voucherName: "",
    voucherCode: "",
    description: "",
    discountType: "",
    discountValue: "",
  });
  // const [formData , setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value
    });
};

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/voucher/create", {
        method: "POST",
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
        navigate(`/dashboard?tab=vouchers`);
      }
    } catch (error) {
      setPublishError("Something went wrong");
    }
  };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Add new voucher</h1>
      <form onSubmit={handleSubmit}>
                <div>
                    <label>Voucher Name:</label>
                    <TextInput
                        type="text" 
                        name="voucherName" 
                        value={formData.voucherName} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Voucher Code:</label>
                    <TextInput
                        type="text" 
                        name="voucherCode" 
                        value={formData.voucherCode} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <Textarea
                        name="description" 
                        value={formData.description} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                <div>
                    <label>Discount Type:</label>
                    <Select 
                        name="discountType" 
                        value={formData.discountType} 
                        onChange={handleInputChange} 
                        required 
                    >
                        <option value="">Select Discount Type</option>
                        <option value="percentage">Percentage Discount</option>
                        <option value="fixed">Fixed Amount Discount</option>
                    </Select>
                </div>
                <div>
                    <label>Value:</label>
                    <TextInput
                        type="number" 
                        name="discountValue" 
                        value={formData.discountValue} 
                        onChange={handleInputChange} 
                        required 
                    />
                </div>
                
                <div className="w-full flex justify-center">
                    <button className="bg-green-600 hover:bg-green-500 p-3 mt-3 rounded-xl text-white font-semibold px-80">Add voucher</button>
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
