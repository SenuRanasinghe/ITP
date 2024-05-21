import axios from 'axios';
import { Table, TextInput } from 'flowbite-react'
import { useEffect, useState } from 'react'
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Swal from 'sweetalert2';

export default function DashFeedback() {

    const [feedbacks, setFeedbacks] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchFeedback = async () => {
          try {
            const { data } = await axios.get(
                `/api/feedback?Email=${search}`
            );
            setFeedbacks(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchFeedback();
    }, [search]);


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
                axios.delete(`/api/feedback/${id}`)
                    .then(response => {
                        console.log(response.data);
                        setFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback._id !== id))
                        Swal.fire(
                            'Deleted!',
                            'The feedback has been deleted.',
                            'success'
                        );
                    })
                    .catch(error => {
                        console.error(error);
                        Swal.fire({
                            title: 'Error!',
                            text: 'Failed to delete the feedback. Please try again.',
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
            // Update the headers to match the feedback data columns
            head: [['Product ID', 'User ID', 'Service', 'Feedback', 'Email']],
            body: feedbacks.map(feedback => [
                feedback.ProductID, 
                feedback.UserID, 
                feedback.Service, 
                feedback.Feedback, 
                feedback.Email
            ]),
            theme: 'grid',
            styles: { fontSize: 8 },
            columnStyles: { 0: { halign: 'center', fillColor: [0, 0, 255] } }, // Example style
            margin: { top: 10 }
        });
        doc.save('feedback_report.pdf'); // Rename the PDF to reflect its content
    };


console.log(feedbacks);

  return (
    <div className="overflow-x-auto mt-10 w-full mx-5">
            <div className="flex justify-between mb-5"> 
                <h1 className="text-4xl font-bold mb-5">Feedbacks</h1>
                <h1 className="text-2xl font-semibold mb-5">Feedbacks count : {feedbacks.length}</h1>
                <div>
                    <form>                    
                        <TextInput
                            type="text"
                            placeholder="Search By Email..."
                            className="hidden lg:inline"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </form>
                </div>
                <div>
                    <button 
                    onClick={downloadPdf} 
                    className="bg-emerald-700 hover:bg-emerald-900 text-white font-bold py-1 px-2 rounded ml-2">
                        Download Report
                    </button>
                </div>
            </div>
            <Table className="rounded-xl shadow-lg w-full mb-5">
                <Table.Head>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Service/Product</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">user name</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Feedback</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Email</Table.HeadCell>
                    <Table.HeadCell className="p-4 text-sm font-bold text-zinc-700 bg-blue-50 ">Action</Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {feedbacks.map(feedback => (
                        <Table.Row key={feedback._id} className="bg-white dark:border-gray-700 dark:bg-gray-800 text-center">
                            <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                            {feedback.Service}
                            </Table.Cell>
                            <Table.Cell>{feedback.userName}</Table.Cell>
                            <Table.Cell>{feedback.Feedback}</Table.Cell>
                            <Table.Cell>{feedback.Email}</Table.Cell>
                            <Table.Cell>
                                <a href="#" 
                                onClick={(e) => deleteHandle(feedback._id, e)}
                                 className="font-medium text-rose-600 hover:underline dark:text-cyan-500 ml-4">
                                    Delete
                                </a>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table>
        </div>
  )
}
