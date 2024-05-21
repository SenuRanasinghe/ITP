import axios from "axios";
import { Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from 'sweetalert2';

export default function DashInventory() {
    const [inventories, setInventories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [totalQuantity, setTotalQuantity] = useState(0);

    useEffect(() => {
        const fetchInventory = async (query) => {
            try {
                const { data } = await axios.get(`/api/inventory?name=${query}`);
                setInventories(data);
                // Calculate total quantity after data is fetched
                const total = data.reduce((acc, item) => acc + item.quantity, 0);
                setTotalQuantity(total);
            } catch (error) {
                console.error(error);
            }
        };
    
        fetchInventory(searchQuery);
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
                axios.delete(`/api/inventory/${id}`)
                    .then(response => {
                        console.log(response.data);
                        setInventories(prevInventories => prevInventories.filter(inventorie => inventorie._id !== id));
                        Swal.fire(
                            'Deleted!',
                            'The inventory has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to delete the inventory. Please try again.',
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
            head: [['ProductID', 'Name', 'Quantity', 'Price', 'Category', 'SupplierID', 'Supplier Name', 'Description']],
            body: inventories.map(item => [
                item._id, 
                item.name, 
                item.quantity, 
                item.price, 
                item.category, 
                item.supplierid, 
                item.suppliername, 
                item.description
            ]),
            theme: 'grid',
            styles: { fontSize: 8 },
            columnStyles: { 0: { halign: 'center', fillColor: [0, 0, 255] } }, // Example: Blue background on first column
            margin: { top: 10 }
        });
        doc.save('inventory_report.pdf');
    };

    return (
        <div className="overflow-x-auto mt-10 w-full mx-5">
            <div className="flex justify-between mb-5"> 
                <h1 className="text-4xl font-bold mb-5">Inventory</h1>
                <div className="text-lg font-semibold mb-2">Total Quantity: {totalQuantity}</div>
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
                    <Link to='/add-inventory'>                
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Add Inventory</button>
                    </Link>
                    <button onClick={downloadPdf} className="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-1 px-2 rounded ml-2">Download Report</button>
                </div>
            </div>
            <Table className="rounded-xl shadow-lg w-full mb-5">
                <Table.Head>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">ProductID</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">img</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Name</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">quantity</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">price</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">category</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">SupplierID</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Supplier Name</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Description</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {inventories.map(inventorie => (
                        <Table.Row key={inventorie._id} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                {inventorie._id}
                            </Table.Cell>
                            <Table.Cell>
                                <img src={inventorie.imageUrl} width={'300px'} />
                            </Table.Cell>
                            <Table.Cell>{inventorie.name}</Table.Cell>
                            <Table.Cell>{inventorie.quantity}</Table.Cell>
                            <Table.Cell>{inventorie.price}</Table.Cell>
                            <Table.Cell>{inventorie.category}</Table.Cell>
                            <Table.Cell>{inventorie.supplierid}</Table.Cell>
                            <Table.Cell>{inventorie.suppliername}</Table.Cell>
                            <Table.Cell>{inventorie.description}</Table.Cell>
                            <Table.Cell>
                                <a href={`/edit-inventory/${inventorie._id}`} className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">
                                    Edit
                                </a>
                                <a href="#" onClick={(e) => deleteHandle(inventorie._id, e)} className="font-medium text-rose-600 hover:underline dark:text-cyan-500 ml-4">
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
