import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function EditCourse() {
    const {id} = useParams();

    const [formData, setFormData] = useState({})
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const response = await axios.get(`/api/course?courseId=${id}`);
                setFormData(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourse();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation checks
        if (!formData.coursePrice || isNaN(formData.coursePrice)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid price (only numbers allowed).',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        try {
            const response = await axios.put(`/api/course/${id}`, JSON.stringify(formData));
            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Course has been updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/dashboard?tab=course');
                }
            });
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update course. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Edit Course</h1>

            <div>
                <div className="mb-2 block">
                    <Label htmlFor="courseName" value="Course Name" />
                </div>
                <TextInput value={formData.courseName} id="courseName" type="text" sizing="md" onChange={handleChange}/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="coursePrice" value="Course Price" />
                </div>
                <TextInput value={formData.coursePrice} id="coursePrice" type="text" sizing="md" onChange={handleChange}/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="courseDescription" value="Course Description" />
                </div>
                <TextInput value={formData.courseDescription} id="courseDescription" type="text" sizing="md" onChange={handleChange}/>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="courseDuration" value="Course Duration" />
                </div>
                <TextInput value={formData.courseDuration} id="courseDuration" type="text" sizing="md" onChange={handleChange}/>
            </div>

            <div className="flex justify-between">
                <div>
                    <Link to="/dashboard?tab=course">
                        <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                    </Link>
                </div>
                <div>
                    <button onClick={(e) => handleSubmit(e)} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Edit Course</button>
                </div>
            </div>
        </div>
    )
}