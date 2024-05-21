import axios from "axios";
import { Label, Select, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';

export default function EditInventory() {
    const { id } = useParams();
    const [categories] = useState(['Hair Care', 'Nail Polish', 'Lotion & Treatment', 'Appliance', 'Makeup', 'Skin Care']);
    const [formData, setFormData] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;

        // Perform validation for quantity and price fields
        if (id === "quantity" || id === "price") {
            // Check if the value is a valid number
            if (!isNaN(value)) {
                setFormData(prevState => ({ ...prevState, [id]: parseFloat(value) }));
            } else {
                // If the value is not a valid number, show error message
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: `Invalid ${id}. Please enter a valid number.`,
                });
            }
        } else {
            // For other fields, update the state normally
            setFormData(prevState => ({ ...prevState, [id]: value }));
        }
    }

    useEffect(() => {
        const fetchInventoryItem = async () => {
            try {
                const response = await axios.get(`/api/inventory?inventoryId=${id}`);
                setFormData(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchInventoryItem();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/inventory/${id}`, formData);
            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Inventory has been updated successfully!',
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
                text: 'Failed to update inventory. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-bold text-center  text-gray-800">Edit Inventory</h1>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="base" value="Name" />
                </div>
                <TextInput value={formData.name} id="name" type="text" sizing="md" onChange={handleChange} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="base" value="Quantity" />
                </div>
                <TextInput value={formData.quantity} id="quantity" type="text" sizing="md" onChange={handleChange} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="base" value="Price" />
                </div>
                <TextInput value={formData.price} id="price" type="text" sizing="md" onChange={handleChange} />
            </div>
            <div className="mb-2 block">
                <Label htmlFor="category" value="Category" />
                <Select id="category" value={formData.category} onChange={handleChange}>
                    <option value="">Select a category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category}>{category}</option>
                    ))}
                </Select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="base" value="Supplier ID" />
                </div>
                <TextInput value={formData.supplierid} id="supplierid" type="text" sizing="md" onChange={handleChange} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="base" value="Supplier Name" />
                </div>
                <TextInput value={formData.suppliername} id="suppliername" type="text" sizing="md" onChange={handleChange} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="base" value="Description" />
                </div>
                <TextInput value={formData.description} id="description" type="text" sizing="md" onChange={handleChange} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="base" value="Image URL" />
                </div>
                <TextInput value={formData.imageUrl} id="imageUrl" type="text" sizing="md" onChange={handleChange} />
            </div>
            <div className="flex justify-between">
                <div>
                    <Link to="/dashboard?tab=inventory">
                        <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                    </Link>
                </div>
                <div>
                    <button onClick={(e) => handleSubmit(e)} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Save Inventory</button>
                </div>
            </div>
        </div>
    )
}