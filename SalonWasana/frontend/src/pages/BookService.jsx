import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

export default function BookService() {
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        userID: currentUser._id,
        name: currentUser.name,
        email: currentUser.email,
        service: '',
        beautician: '',
        selectedDate: '',
        time: ''
    });
    const [services, setServices] = useState([]);
    const [beauticians, setBeauticians] = useState([]);
    const [timeSlots, setTimeSlots] = useState([]);
    const navigate = useNavigate();

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

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if selected date is earlier than the current date
        const selectedDate = new Date(formData.selectedDate);
        const currentDate = new Date();
        if (selectedDate < currentDate) {
            Swal.fire({
                title: 'Error!',
                text: 'Please select a date that is not in the past.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return; // Exit the function early
        }

        // Check if any field is empty
        const emptyFields = Object.values(formData).some(value => value === '');
        if (emptyFields) {
            // If any field is empty, display an error message
            Swal.fire({
                title: 'Error!',
                text: 'Please fill out all fields to book an appointment.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return; // Exit the function early
        }

        try {
            const response = await axios.post("/api/appointment", formData);
            console.log("Appointment Booked Successfully", response.data);
            Swal.fire({
                title: 'Success!',
                text: 'Appointment Booked Successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/');
                }
            });
        } catch (error) {
            console.error("Failed to book appointment", error.response.data.message);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to book appointment.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    useEffect(() => {
        setTimeSlots(generateTimeSlots()); // Generate and set time slots when the component mounts
    }, []);

    console.log(currentUser);

    return (
        <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Book an Appointment</h1>

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
                <TextInput id="selectedDate" type="date" sizing="md" onChange={handleChange} value={formData.selectedDate} />
            </div>
            <div>
                <Label htmlFor="time" value="Select Time" />
                <select id="time" className="form-select block w-full" onChange={handleChange} value={formData.time}>
                    <option value="">Select Time Slot</option>
                    {timeSlots.map((time, index) => (
                        <option key={index} value={time}>{time}</option>
                    ))}
                </select>
            </div>

            <div className="flex justify-between">
                <Link to="/dashboard?tab=service">
                    <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                </Link>

                <button onClick={handleSubmit} className="w-1/2 rounded-md bg-blue-500 px-4 py-2 text-white">Book Appointment</button>
            </div>
        </div>
    );
}

function generateTimeSlots() {
    const slots = [];
    let startTime = new Date().setHours(8, 0, 0, 0); // Start at 8:00 AM
    const endTime = new Date().setHours(19, 0, 0, 0); // End at 7:00 PM

    while (startTime < endTime) {
        let slot = new Date(startTime);
        slots.push(slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
        startTime += 60 * 60 * 1000; // Add 1 hour
    }

    return slots;
}