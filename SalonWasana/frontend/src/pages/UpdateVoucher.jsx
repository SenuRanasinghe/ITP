import { Alert, Select, Textarea, TextInput} from "flowbite-react";
import { useState } from "react";
import { useNavigate , useParams} from "react-router-dom";
import { useEffect } from "react";

export default function UpdateVoucher() {
    const [formData , setFormData] = useState({});
    const [publishError, setPublishError] = useState(null);
    const { voucherId } = useParams();
    console.log(voucherId);

    const navigate = useNavigate();
    

    //fetch relevant order using id
    useEffect(() => {
        if (voucherId) {
            const fetchVoucher = async () => {
                try {
                    const res = await fetch(`/api/voucher/get-voucher/${voucherId}`);
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
        
            fetchVoucher();
        }
    }, [voucherId]);
    

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch(`/api/voucher/update/${formData._id}`, {
                method: 'PUT',
                headers: {
                  'Content-Type': 'application/json',
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
            navigate('/dashboard?tab=vouchers');
          }
        } catch (error) {
          setPublishError('Something went wrong');
        }
      };

  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Update the voucher</h1>
      <form onSubmit={handleSubmit}>
                <div>
                    <label>Voucher Name:</label>
                    <TextInput
                        type="text" 
                        name="voucherName" 
                        value={formData.voucherName} 
                        onChange={(e) => setFormData({ ...formData, voucherName: e.target.value })} 
                        required 
                    />
                </div>
                <div>
                    <label>Voucher Code:</label>
                    <TextInput
                        type="text" 
                        name="voucherCode" 
                        value={formData.voucherCode} 
                        onChange={(e) => setFormData({ ...formData, voucherCode: e.target.value })} 
                        required 
                    />
                </div>
                <div>
                    <label>Description:</label>
                    <Textarea
                        name="description" 
                        value={formData.description} 
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })} 
                        required 
                    />
                </div>
                <div>
                    <label>Discount Type:</label>
                    <Select 
                        name="discountType" 
                        value={formData.discountType} 
                        onChange={(e) => setFormData({ ...formData, discountType: e.target.value })} 
                        required 
                    >
                        <option value="">Select Discount Type</option>
                        <option value="percentage">Percentage Discount</option>
                        <option value="fixed">Fixed Amount Discount</option>
                    </Select>
                </div>
                <div>
                    <label>Discount Value:</label>
                    <TextInput
                        type="number" 
                        name="discountValue" 
                        value={formData.discountValue} 
                        onChange={(e) => setFormData({ ...formData, discountValue: e.target.value })} 
                        required 
                    />
                    <label>Voucher Status:<h1 className="px-2" style={{ color: formData.isActive ? 'green' : 'red' }}  >{formData.isActive ? 'Active':'Inactive'}</h1></label>
                        <br />

                    <label>Select one to change voucher status:</label>
                    <Select 
                        onChange={(e) => setFormData({ ...formData, isActive: e.target.value })} 
                        required 
                    >
                        <option value="">Select one</option>
                        <option value="true">Active</option>
                        <option value="false">Inactive</option>
                    </Select>

                </div>
                
                <div className="w-full flex justify-center">
                    <button className="bg-green-600 hover:bg-green-500 p-3 mt-3 rounded-xl text-white font-semibold px-80">Update</button>
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
