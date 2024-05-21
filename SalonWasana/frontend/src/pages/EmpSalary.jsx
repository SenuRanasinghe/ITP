import axios from "axios";
import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function EmpSalary() {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchEmployee = async () => {
          try {
            const { data } = await axios.get(
                `/api/employee`
            );
            setEmployees(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchEmployee();
    }, []);


    return (
        <div className="overflow-x-auto mt-10 w-[90%] mx-auto">

            <div className="flex justify-between mb-5"> 
                <h1 className="text-2xl font-bold mb-5">Salary Details</h1>
                <Link to='/dashboard?tab=employee'>                
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Back</button>
                </Link>
            </div>

            <Table>
                <Table.Head>
                    <Table.HeadCell className="text-lg" >ID</Table.HeadCell>
                    <Table.HeadCell className="text-lg">Name</Table.HeadCell>
                    <Table.HeadCell className="text-lg">img</Table.HeadCell>
                    <Table.HeadCell className="text-lg">Basic Salary</Table.HeadCell>
                    <Table.HeadCell className="text-lg">ETP</Table.HeadCell>
                    <Table.HeadCell className="text-lg">EPF</Table.HeadCell>
                    <Table.HeadCell className="text-lg">Payable Salary</Table.HeadCell>
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
                            <Table.Cell className="font-semibold">Rs.{employee.BasicSalary}.00</Table.Cell>
                            <Table.Cell className="font-semibold">Rs.{employee.BasicSalary * 0.08}.00</Table.Cell>
                            <Table.Cell className="font-semibold">Rs.{employee.BasicSalary * 0.12}.00</Table.Cell>
                            <Table.Cell className="font-semibold">Rs.{employee.BasicSalary - (employee.BasicSalary * 0.08)}.00</Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
    );
}
