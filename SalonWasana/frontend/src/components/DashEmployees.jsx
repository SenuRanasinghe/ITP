import axios from "axios";
import { Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from 'sweetalert2';

export default function DashEmployees() {
    const [employees, setEmployees] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchEmployee = async (query) => {
          try {
            const { data } = await axios.get(
                `/api/employee?employeeName=${query}`
            );
            setEmployees(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchEmployee(searchQuery);
    }, [searchQuery]);

    const deleteHandle = async (id, event) => {
        event.preventDefault(); 
        // Sweet Alert for confirmation
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                // Proceed with deletion if confirmed
                axios.delete(`/api/employee/${id}`)
                    .then(response => {
                        console.log(response.data);
                        setEmployees(prevEmployees => prevEmployees.filter(employee => employee._id !== id));
                        Swal.fire(
                            'Deleted!',
                            'The employee has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to delete the employee. Please try again.',
                            icon: 'error',
                            confirmButtonText: 'OK'
                        });
                    });
            }
        });
    }


    const downloadPdf = () => {
        const doc = new jsPDF();
        autoTable(doc, {
            head: [['Name', 'Age', 'Contact Number', 'Email', 'Address', 'Description']],
            body: employees.map(emp => [emp.EmployeeName, emp.Age, emp.ContactNumber, emp.Email, emp.Address, emp.Description]),
            theme: 'grid',
        });
        doc.save('employees.pdf');
    };

    return (
        <div className="overflow-x-auto mt-10 w-full mx-5">
            <div className="flex justify-between mb-5"> 
                <h1 className="text-4xl font-bold mb-5">Employees</h1>
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
                <div>
                    <Link to='/add-employee'>                
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Add Employee</button>
                    </Link>
                    <Link to='/employee-salary'>                
                        <button className="m-3 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Salary Details</button>
                    </Link>
                    <button onClick={downloadPdf} className="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-1 px-2 rounded ml-2">Download Report</button>
                </div>
            </div>
            <Table className="rounded-xl shadow-lg w-full">
                <Table.Head>
                    <Table.HeadCell className="p-2 text-sm font-bold text-zinc-700 bg-blue-50 ">ID</Table.HeadCell>
                    <Table.HeadCell className="p-2 text-sm font-bold text-zinc-700 bg-blue-50 ">Name</Table.HeadCell>
                    <Table.HeadCell className="p-2 text-sm font-bold text-zinc-700 bg-blue-50 ">img</Table.HeadCell>
                    <Table.HeadCell className="p-2 text-sm font-bold text-zinc-700 bg-blue-50 ">Age</Table.HeadCell>
                    <Table.HeadCell className="p-2 text-sm font-bold text-zinc-700 bg-blue-50 ">Contact Number</Table.HeadCell>
                    <Table.HeadCell className="p-2 text-sm font-bold text-zinc-700 bg-blue-50 ">Email</Table.HeadCell>
                    <Table.HeadCell className="p-2 text-sm font-bold text-zinc-700 bg-blue-50 ">Address</Table.HeadCell>
                    <Table.HeadCell className="p-2 text-sm font-bold text-zinc-700 bg-blue-50 ">Description</Table.HeadCell>
                    <Table.HeadCell className="p-2 text-sm font-bold text-zinc-700 bg-blue-50 ">Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {employees.map(employee => (
                        <Table.Row key={employee._id} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {employee._id}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {employee.EmployeeName}
                            </Table.Cell>
                            <Table.Cell>
                                <img src={employee.EmployeeImage} width={'100px'} />
                            </Table.Cell>
                            <Table.Cell>{employee.Age}</Table.Cell>
                            <Table.Cell>{employee.ContactNumber}</Table.Cell>
                            <Table.Cell>{employee.Email}</Table.Cell>
                            <Table.Cell>{employee.Address}</Table.Cell>
                            <Table.Cell>{employee.Description}</Table.Cell>
                            <Table.Cell>
                                <a href={`/edit-employee/${employee._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </a>
                                <a href="#" onClick={(e) => deleteHandle(employee._id, e)} className="font-medium text-rose-600 hover:underline dark:text-cyan-500 ml-4">
                                    Delete
                                </a>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
