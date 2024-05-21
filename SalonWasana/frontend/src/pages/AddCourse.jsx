import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';


export default function EditCourse() {
    const [formData, setFormData] = useState({
        courseName: '',
        coursePrice: '',
        courseDescription: '',
        courseDuration: ''
    });
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
        // Reset errors when user starts correcting them
        if (!errors[e.target.id]) {
            setErrors({ ...errors, [e.target.id]: null });
        }
    };

    const validateForm = () => {
        let newErrors = {};
        // Check required fields
        if (!formData.courseName) newErrors.courseName = "Course name is required";
        if (!formData.courseDescription) newErrors.courseDescription = "Course description is required";
        if (!formData.courseDuration) newErrors.courseDuration = "Course duration is required";

        // Check course price is a number and is not empty
        if (!formData.coursePrice) {
            newErrors.coursePrice = "Course price is required";
        } else if (isNaN(parseFloat(formData.coursePrice))) {
            newErrors.coursePrice = "Course price must be a number";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response = await axios.post("/api/course/", formData);
                console.log(response.data);
                Swal.fire({
                    title: 'Success!',
                    text: 'Course added successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                }).then((result) => {
                    if (result.isConfirmed) {
                        navigate('/dashboard?tab=course');
                    }
                });
            } catch (error) {
                console.error(error);
            // Optionally, handle errors using SweetAlert2 as well
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
            <h1 className="text-3xl font-bold text-center text-gray-800">Add Course</h1>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="courseName" value="Course Name" />
                    <TextInput id="courseName" type="text" sizing="md" onChange={handleChange} value={formData.courseName}/>
                    {errors.courseName && <p className="text-red-500 text-xs">{errors.courseName}</p>}
                </div>
                <div>
                    <Label htmlFor="coursePrice" value="Course Price" />
                    <TextInput id="coursePrice" type="text" sizing="md" onChange={handleChange} value={formData.coursePrice}/>
                    {errors.coursePrice && <p className="text-red-500 text-xs">{errors.coursePrice}</p>}
                </div>
                <div>
                    <Label htmlFor="courseDescription" value="Course Description" />
                    <TextInput id="courseDescription" type="text" sizing="md" onChange={handleChange} value={formData.courseDescription}/>
                    {errors.courseDescription && <p className="text-red-500 text-xs">{errors.courseDescription}</p>}
                </div>
                <div>
                    <Label htmlFor="courseDuration" value="Course Duration" />
                    <TextInput id="courseDuration" type="text" sizing="md" onChange={handleChange} value={formData.courseDuration}/>
                    {errors.courseDuration && <p className="text-red-500 text-xs">{errors.courseDuration}</p>}
                </div>

                <div className="flex justify-between">
                    <Link to="/dashboard?tab=course">
                        <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                    </Link>
                    <Link>
                        <button onClick={handleSubmit} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Add Course</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
