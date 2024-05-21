import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function AddService() {
    const [formData, setFormData] = useState({
        ServiceID: '',
        ServiceName: '',
        ServiceType: '',
        Description: '',
        Price: '',
        Image: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
console.log(formData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Reset errors for specific field when user starts correcting them
        if (errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: null });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        // Required fields validation
        Object.keys(formData).forEach(key => {
            if (!formData[key]) {
                newErrors[key] = "This field is required";
            }
        });

        // Price must be a number
        if (formData.Price && isNaN(Number(formData.Price))) {
            newErrors.Price = "Price must be a number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post("/api/service/", formData);
                console.log(response.data);
                Swal.fire({
                    title: 'Success!',
                    text: 'Service added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/dashboard?tab=service');
                    }
                });
            } catch (error) {
                console.error(error);
                Swal.fire({
                    title: 'Error!',
                    text: 'Failed to add service. Please try again.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
            }
        }
    };

    return (
        <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Add Service</h1>

            {Object.entries(formData).map(([key, value]) => (
                <div key={key}>
                    <div className="mb-2 block">
                        <Label htmlFor={key} value={key.replace(/([A-Z])/g, ' $1').trim()} />
                        <TextInput id={key} type="text" sizing="md" onChange={handleChange} value={value} />
                        {errors[key] && <p className="text-red-500 text-xs mt-1">{errors[key]}</p>}
                    </div>
                </div>
            ))}

            <div className="flex justify-between">
                <Link to="/dashboard?tab=service">
                    <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                </Link>

                <Link>
                    <button onClick={handleSubmit} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Add Service</button>
                </Link>
            </div>
        </div>
    );
}
