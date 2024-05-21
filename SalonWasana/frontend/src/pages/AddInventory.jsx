import axios from "axios";
import { Label, TextInput, Select } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function AddInventory() {
    const [formData, setFormData] = useState({
        name: '',
        quantity: '',
        price: '',
        category: '',
        supplierid: '',
        suppliername: '',
        description: '',
        imageUrl: ''
    });
    const [errors, setErrors] = useState({});
    const [categories, setCategories] = useState(['Hair Care', 'Nail Polish', 'Lotion & Treatment', 'Appliance', 'Makeup', 'Skin Care']); // Example categories
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Clear errors as user modifies the field
        if (errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: null });
        }
    };
    const validateForm = () => {
        let isValid = true;
        let newErrors = {};

        // Required fields validation
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                isValid = false;
                newErrors[key] = "This field is required";
            }
        });

        // Quantity must be a number
        if (formData.quantity && !/^\d+$/.test(formData.quantity)) {
            isValid = false;
            newErrors.quantity = "Quantity must be a number";
        }

        // Price must be a number
        if (formData.price && isNaN(Number(formData.price))) {
            isValid = false;
            newErrors.price = "Price must be a number";
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post("/api/inventory", formData);
                Swal.fire({
                    title: 'Success!',
                    text: 'Inventory added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/dashboard?tab=inventory');
                    }
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add inventory. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Add Inventory</h1>
            {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                    <div className="mb-2 block">
                        <Label htmlFor={key} value={key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')} />
                        {key === 'category' ? (
                            <Select id={key} onChange={handleChange} value={value}>
                                <option value="">Select a category</option>
                                {categories.map((category) => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </Select>
                        ) : (
                            <TextInput id={key} type="text" sizing="md" onChange={handleChange} value={value} />
                        )}
                        {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                    </div>
                </div>
            ))}
            <div className="flex justify-between">
                <Link to="/dashboard?tab=inventory">
                    <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                </Link>
                <Link>
                <button onClick={handleSubmit} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Add Inventory</button>
                </Link>
            </div>
        </div>
    );
}
