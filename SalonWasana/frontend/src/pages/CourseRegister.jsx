import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function CourseRegister() {
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState('');
    const [courseFee, setCourseFee] = useState('');
    const [name, setName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await axios.get('/api/course');
                setCourses(data); // Assuming the API returns an array of courses
            } catch (error) {
                console.error(error);
            }
        };
        fetchCourses();
    }, []);

    const handleCourseChange = (event) => {
        const selectedId = event.target.value;
        setSelectedCourseId(selectedId);
        const selectedCourse = courses.find(course => course._id === selectedId);
        if (selectedCourse) {
            const tax = selectedCourse.coursePrice * 0.1;
            const totalFee = selectedCourse.coursePrice + tax;
            setCourseFee(totalFee.toFixed(2)); // Calculate and set the total fee including tax
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validation checks
        if (!name || !birthday || !gender || !address || !email || !mobileNumber || !selectedCourseId) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill all required fields.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        // Validate mobile number format
        if (mobileNumber.length !== 10 || isNaN(mobileNumber)) {
            Swal.fire({
                title: 'Error!',
                text: 'Please enter a valid 10-digit mobile number.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            return;
        }

        Swal.fire({
            title: 'Success!',
            text: 'Registered successfully!',
            icon: 'success',
            confirmButtonText: 'OK'
        }).then((result) => {
            if (result.isConfirmed) {
                navigate('/courses');
            }
        });
    }

    return (
        <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
            <h1 className="text-3xl font-bold text-center text-gray-800">Register to a Course</h1>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="name" value="Name" />
                </div>
                <TextInput id="name" type="text" sizing="md" required value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="birthday" value="Birthday" />
                </div>
                <TextInput id="birthday" type="date" sizing="md" required value={birthday} onChange={(e) => setBirthday(e.target.value)} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="gender" value="Gender" />
                </div>
                <select 
                    id="gender" 
                    className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                    required
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                </select>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="address" value="Address" />
                </div>
                <TextInput id="address" type="text" sizing="md" required value={address} onChange={(e) => setAddress(e.target.value)} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="email" value="Email" />
                </div>
                <TextInput id="email" type="email" sizing="md" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="mobileNumber" value="Mobile Number" />
                </div>
                <TextInput id="mobileNumber" type="text" sizing="md" required value={mobileNumber} onChange={(e) => setMobileNumber(e.target.value)} />
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="course" value="Select Course" />
                    <select 
                        id="course" 
                        className="form-select block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding bg-no-repeat border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
                        required
                        onChange={handleCourseChange}
                        value={selectedCourseId}
                    >
                        <option value="">Select Course</option>
                        {courses.map(course => (
                            <option key={course._id} value={course._id}>{course.courseName}</option>
                        ))}
                    </select>
                </div>
            </div>
            <div>
                <div className="mb-2 block">
                    <Label htmlFor="courseFee" value="Course Fee (including 10% Tax)" />
                    <TextInput id="courseFee" type="text" sizing="md" readOnly value={courseFee} />
                </div>
            </div>
            <div className="flex justify-between">
                <Link to="/courses">
                    <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                </Link>
                <Link>
                <button onClick={handleSubmit} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Register</button>
                </Link>
            </div>
        </div>
    );
}