import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

export default function FeedbackForm() {
    const { id } = useParams();
    
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        Email: currentUser.email,
        Service: "",
        Feedback: "",
        ProductID: id,
        UserID: currentUser._id,
        userName: currentUser.name,
    });
    const navigate = useNavigate();
    const [services, setServices] = useState([]);
    const [products, setProducts] = useState([]);

    console.log(services);
    console.log(products);
    console.log(formData);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    
    useEffect(() => {
        axios.get('/api/service').then(response => {
            setServices(response.data);
        }).catch(error => {
            console.error(error);
        });
        axios.get('/api/inventory').then(response => {
            setProducts(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);



    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if all required fields are filled
        if (!formData.Email || !formData.Service || !formData.Feedback) {
            Swal.fire({
                title: 'Error!',
                text: 'All fields are required. Please fill out all fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }
        
        try {
            const response = await axios.post("/api/feedback", formData);
            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Feedback added successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/products');
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add feedback. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Add Feedback</h1>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="Email" value="Email" />
                </div>
                <TextInput id="Email" type="email" sizing="md" onChange={handleChange} value={currentUser.email}/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="Service" value="Service/Product" />
                </div>
                <select id="Service" className="form-select block w-full" onChange={handleChange}>
                    <option value="">Select Service/Product</option>
                    {services.map(service => (
                        <option key={service._id} value={service.ServiceName}>{service.ServiceName}</option>
                    ))}
                    {products.map(product => (
                        <option key={product._id} value={product.name}>{product.name}</option>
                    ))}
                </select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="Feedback" value="Feedback" />
                </div>
                <TextInput id="Feedback" type="text" sizing="md" onChange={handleChange} />
            </div>

            <div className="flex justify-between">
                <Link to="/">
                    <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                </Link>
                <Link>
                <button onClick={(e) => handleSubmit(e)} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Add Feedback</button>
                </Link>
            </div>

        </div>
    );
}
