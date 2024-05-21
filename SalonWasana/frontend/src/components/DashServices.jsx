import axios from "axios";
import { Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from 'sweetalert2';

export default function DashServices() {
    const [services, setServices] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchServices = async () => {
            try {
                const { data } = await axios.get(`/api/service?serviceName=${searchQuery}`);
                setServices(data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchServices(searchQuery);
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
                axios.delete(`/api/service/${id}`)
                    .then(response => {
                        console.log(response.data);
                        setServices(prevServices => prevServices.filter(service => service._id !== id));
                        Swal.fire(
                            'Deleted!',
                            'The service has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to service the course. Please try again.',
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
            head: [['ID','Name', 'Type', 'Description', 'Price', 'Date Created']],
            body: services.map(service => [
                service.ServiceID,
                service.ServiceName,
                service.ServiceType,
                service.Description,
                `Rs ${service.Price}`,
                new Date(service.createdAt).toLocaleDateString()
            ]),
            theme: 'grid',
        });
        doc.save('Services.pdf');
    };

    return (
        <div className="overflow-x-auto mt-10 w-full mx-5">
            <div className="flex justify-between mb-5"> 
                <h1 className="text-4xl font-bold mb-5">Services</h1>
                <h1 className="text-xl font-bold mb-5">Total Services: {services.length}</h1>

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
                    <Link to='/add-service'>                
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Add Service</button>
                    </Link>
                    <button onClick={downloadPdf} className="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-1 px-2 rounded ml-2">Download Report</button>
                </div>
            </div>
            <Table className="rounded-xl shadow-lg w-full mb-5">
                <Table.Head>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 " >ID</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Name</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Image</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Type</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Description</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Price</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Date Created</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {services.map(service => (
                        <Table.Row key={service._id} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {service.ServiceID}
                            </Table.Cell>
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {service.ServiceName}
                            </Table.Cell>                            
                            <Table.Cell>
                                <img src={service.Image} width={'200px'} alt="" />
                            </Table.Cell>
                            <Table.Cell>{service.ServiceType}</Table.Cell>
                            <Table.Cell>{service.Description}</Table.Cell>
                            <Table.Cell>{`Rs ${service.Price}`}</Table.Cell>
                            <Table.Cell>{new Date(service.createdAt).toLocaleDateString()}</Table.Cell>
                            <Table.Cell>
                                <a href={`/edit-service/${service._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </a>
                                <a href="#" onClick={(e) => deleteHandle(service._id, e)} className="font-medium text-rose-600 hover:underline dark:text-cyan-500 ml-4">
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
