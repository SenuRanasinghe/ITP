import axios from "axios";
import { Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function DashAppointment() {
    const [courses, setCourses] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    console.log(searchQuery); 

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const { data } = await axios.get(
                `/api/appointment?name=${searchQuery}`
            );
            setCourses(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchCourses();
    }, [searchQuery]);

    console.log(courses);

    return (
        <div className="overflow-x-auto mt-10 w-full mx-5">
            <div className="flex justify-between mb-5"> 
                <h1 className="text-4xl font-bold mb-5">Appointments</h1>
            <p className="text-xl font-semibold mb-3">Total Appointments: {courses.length}</p>
                <div>
                    <form>                    
                        <TextInput
                            type="text"
                            placeholder="Search By Name..."
                            className="hidden lg:inline"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </form>

                </div>
            </div>
                    
            <Table className="rounded-xl shadow-lg w-full mb-5">
                <Table.Head>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Name</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Email</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Service</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Beautician</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Date</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Time</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {courses.map(course => (
                        <Table.Row key={course._id} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {course.name}
                            </Table.Cell>
                            <Table.Cell>{course.email}</Table.Cell>
                            <Table.Cell>{course.service}</Table.Cell>
                            <Table.Cell>{course.beautician}</Table.Cell>
                            <Table.Cell>{course.selectedDate}</Table.Cell>
                            <Table.Cell>{course.time}</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
