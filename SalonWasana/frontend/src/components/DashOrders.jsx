import { Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle} from "react-icons/hi";
import { useSelector } from "react-redux";
import 'boxicons/css/boxicons.min.css';
import { Link } from "react-router-dom";
import html2pdf from 'html2pdf.js';

export default function DashOrders() {

    const { currentUser } = useSelector((state) => state.user);
    const [Orders, setOrders] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModel , setShowModel] = useState(false);
    const [orderIdToDelete, setOrderIdToDelete] = useState('');

    const [searchName, setSearchName] = useState('');


    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await fetch(`/api/order/get-orders`);
                const data = await res.json();
               

               
                if (res.ok) {
                    setOrders(data);
                    if (data.length < 9) {  
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log("error in fetching", error);
            }
        };

        if (currentUser) {
            fetchOrders();
        }
    }, [currentUser, Orders]); 

    const handleDeleteOrder = async () => {
        setShowModel(false);
        try {
            const res = await fetch(
                `/api/order/delete/${orderIdToDelete}`,
                {
                    method: 'DELETE',
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message); 
            } else {
                setOrders((prev) =>
                    prev.filter((order) => order._id !== orderIdToDelete)
                );
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const generatePDFReport = () => {
        const content = `
          <style>
            table {
              margin:0 auto;
              width: 90%;
              border-collapse: collapse;
            }
            th, td {
              padding: 8px;
              text-align: left;
              border-bottom: 1px solid #ddd;
            }
            th {
              background-color: #f2f2f2;
              font-size: 10px; 
            }
            td {
              font-size: 10px; 
            }
            .report-title{
              text-align:center;
              font-size:18px;
            }
            .details{
              margin-top:50px;
              margin-left:30px;
  
            }
          </style>
  
          <h1 class="report-title"><b>Order Details Report</b></h1>
          <div class="details">
            
          </div>
          <br>
          <br>
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Payment Id</th>
                <th>Items</th>
                <th>Customer</th>
              </tr>
            </thead>
            <tbody>
              ${Orders.map((order) => `
                <tr>
                  <td>${order._id}</td>
                  <td>${order.paymentIntentId}</td>
                  <td>
                    ${order.Items.map((product) => `
                        <p>Name: ${product.name}</p>
                        <p>Quantity: x${product.quantity}</p>
                    `).join('')}
                  </td>
                  <td>${order.customer_details.name}<br/>
                    ${order.customer_details.email}
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      
        html2pdf().from(content).set({ margin: 1, filename: 'orders_report.pdf' }).save();
      };
      
      
      const handleGenerateReport = () => {
        generatePDFReport();
      
      };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            <div className="flex flex-wrap gap-5">
                <div className="">
                    <button
                        onClick={handleGenerateReport}
                        className="p-3 bg-green-500 hover:bg-green-600 hover:opacity-95 text-white rounded-lg"
                    >
                        Generate Report
                    </button>
                </div>
            </div>
            <h1 className="pt-6 px-4 font-semibold">Orders received</h1>
            { Array.isArray(Orders) && Orders.length > 0 ? (
                <>
                    <div className="flex ">
                        <TextInput
                            type='text'
                            placeholder='Search an order by (User or Payment ID)'
                            required
                            id='title'
                            className='flex-1'
                            style={{ width: 700, marginTop: 30, marginBottom: 30, marginLeft: 250 }}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Order ID</Table.HeadCell>
                            <Table.HeadCell>Payment ID</Table.HeadCell>
                            <Table.HeadCell>Items</Table.HeadCell>
                            <Table.HeadCell>Customer</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>

                        </Table.Head>
                        {Orders.filter((order) => {
                            const searchQuery = searchName.toLowerCase();
                            const customer = order.customer_details.name.toLowerCase().includes(searchQuery);
                            const paymentIntentId = order.paymentIntentId.toLowerCase().includes(searchQuery);

                            // Return true if any of the search criteria match
                            return customer || paymentIntentId;
                        }).map((order) => (
                            <Table.Body className='divide-y' key={order._id}>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>{order._id}</Table.Cell>
                                    <Table.Cell>{order.paymentIntentId}</Table.Cell>
                                    <Table.Cell>
                                        {order.Items.map((item) => (
                                            <div key={item._id}>
                                                <p>Name: {item.name}</p>
                                                <p>Quantity: {item.quantity}</p>
                                                <p>Voucher Value: Rs.{item.price}.00</p>
                                                <p>Voucher Code: {item.voucherCode}</p><br />
                                            </div>
                                            
                                        ))}
                                    </Table.Cell>
                                    <Table.Cell>
                                        <p>{order.customer_details.name}</p>
                                        <p>{order.customer_details.email}</p>
                                        <p>{order.customer_details.phone}</p>
                                        
                                    </Table.Cell>
                                    <Table.Cell>
                                    <div className="flex flex-row gap-2">
                                      <Link to={`/update-order/${order._id}`}>
                                        <button><box-icon name='edit-alt' color='#65B741'></box-icon></button>
                                      </Link>
                                      
                                      <button onClick={() => {
                                                setShowModel(true);
                                                setOrderIdToDelete(order._id);
                                              }} ><box-icon name='x-circle' color='#D20062'></box-icon></button>
                                    </div>
                                  </Table.Cell>
                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {showMore && (
                        <button
                            onClick=""
                            className='w-full text-teal-500 self-center text-sm py-7'
                        >
                            Show more
                        </button>
                    )}
                </>
            ):(
                <p>You have not any orders yet</p>
            )}
            <Modal show={showModel} onClose={() => setShowModel(false)} popup size='lg'>
                <Modal.Header/>
                <Modal.Body>
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-red-600 dark:text-red-500 mb-4 mx-auto"/>
                        <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete this Order</h3>
                    </div>
                    <div className='flex justify-center gap-4'>
                        <button className="text-white rounded bg-red-600 hover:bg-red-700 p-3" onClick={handleDeleteOrder}>
                            Yes, I am sure
                        </button>
                        <button className="text-white rounded bg-green-500 hover:bg-green-600 p-3" onClick={() => setShowModel(false)}>
                            No, cancel
                        </button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}
