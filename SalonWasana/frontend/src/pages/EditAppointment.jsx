import React, { useEffect, useState } from "react";
import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function EditAppointment() {
    const { id } = useParams();

    const [formData, setFormData] = useState({});
    const [services, setServices] = useState([]);
    const [beauticians, setBeauticians] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        if (id === "selectedDate") {
            const currentDate = new Date();
            const selectedDate = new Date(value);
            if (selectedDate < currentDate) {
                Swal.fire({
                    title: 'Error!',
                    text: 'Please select a date that is not before the current date.',
                    icon: 'error',
                    confirmButtonText: 'OK'
                });
                return; // Don't update the state if the date is before the current date
            }
        }
        setFormData({ ...formData, [id]: value });
    }

    useEffect(() => {
        const fetchAppointment = async () => {
            try {
                const response = await axios.get(`/api/appointment?appointmentId=${id}`);
                setFormData(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchAppointment();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`/api/appointment/${id}`, formData);
            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Appointment has been updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/dashboard?tab=profile');
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update appointment. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    useEffect(() => {
        axios.get('/api/service').then(response => {
            setServices(response.data);
        }).catch(error => {
            console.error(error);
        });
        axios.get('/api/employee').then(response => {
            setBeauticians(response.data);
        }).catch(error => {
            console.error(error);
        });
    }, []);

    return (
        <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Update the Appointment</h1>

            <div>
                <Label htmlFor="name" value="Name" />
                <TextInput id="name" type="text" sizing="md" value={formData.name} readOnly />
            </div>
            <div>
                <Label htmlFor="email" value="Email" />
                <TextInput id="email" type="email" sizing="md" value={formData.email} readOnly />
            </div>
            <div>
                <Label htmlFor="service" value="Select Service" />
                <select id="service" className="form-select block w-full" onChange={handleChange} value={formData.service}>
                    <option value="">Select Service</option>
                    {services.map(service => (
                        <option key={service._id} value={service.ServiceName}>{service.ServiceName}</option>
                    ))}
                </select>
            </div>
            <div>
                <Label htmlFor="beautician" value="Select Beautician" />
                <select id="beautician" className="form-select block w-full" onChange={handleChange} value={formData.beautician}>
                    <option value="">Select Beautician</option>
                    {beauticians.map(beautician => (
                        <option key={beautician._id} value={beautician.EmployeeName}>{beautician.EmployeeName}</option>
                    ))}
                </select>
            </div>
            <div>
                <Label htmlFor="selectedDate" value="Select Date" />
                <TextInput value={formData.selectedDate} id="selectedDate" type="date" sizing="md" onChange={handleChange} />
            </div>
            <div>
                <Label htmlFor="time" value="Select Time" />
                <TextInput id="time" type="time" sizing="md" onChange={handleChange} value={formData.time} />
            </div>

            <div className="flex justify-between">
                <Link to="/dashboard?tab=profile">
                    <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                </Link>

                <button onClick={handleSubmit} className="w-1/2 rounded-md bg-blue-500 px-4 py-2 text-white">Update Appointment</button>

            </div>
        </div>
    )
}