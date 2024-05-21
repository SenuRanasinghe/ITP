import { Modal, Table, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiOutlineExclamationCircle} from "react-icons/hi";
import { useSelector } from "react-redux";
import 'boxicons/css/boxicons.min.css';
import { Link } from "react-router-dom";
import html2pdf from 'html2pdf.js';

export default function DashOrders() {

    const { currentUser } = useSelector((state) => state.user);
    const [vouchers, setVouchers] = useState([]);
    const [showMore, setShowMore] = useState(true);
    const [showModel , setShowModel] = useState(false);
    const [voucherIdToDelete, setVoucherIdToDelete] = useState('');

    const [searchName, setSearchName] = useState('');


    useEffect(() => {
        const fetchVouchers = async () => {
            try {
                const res = await fetch(`/api/voucher/get-vouchers`);
                const data = await res.json();
               

               
                if (res.ok) {
                    setVouchers(data);
                    if (data.length < 9) {  
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log("error in fetching", error);
            }
        };

        if (currentUser) {
            fetchVouchers();
        }
    }, [currentUser, vouchers]); 

    const handleDeleteOrder = async () => {
        setShowModel(false);
        try {
            const res = await fetch(
                `/api/voucher/delete/${voucherIdToDelete}`,
                {
                    method: 'DELETE',
                }
            );
            const data = await res.json();
            if (!res.ok) {
                console.log(data.message); 
            } else {
                setVouchers((prev) =>
                    prev.filter((order) => order._id !== voucherIdToDelete)
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
  
          <h1 class="report-title"><b>Voucher Details Report</b></h1>
          <div class="details">
            
          </div>
          <br>
          <br>
          <table>
            <thead>
              <tr>
                <th>Voucher ID</th>
                <th>Voucher Name</th>
                <th>Type</th>
                <th>Discount Value</th>
                <th>Is Active</th>

              </tr>
            </thead>
            <tbody>
              ${vouchers.map((voucher) => `
                <tr>
                  <td>${voucher._id}</td>
                  <td>${voucher.voucherName}</td>
                  <td>${voucher.voucherCode}</td>
                  <td>${voucher.discountType}</td>
                  <td>${voucher.discountValue}%</td>
                  <td>${voucher.IsActive}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        `;
      
        html2pdf().from(content).set({ margin: 1, filename: 'voucher_report.pdf' }).save();
      };
      
      
      const handleGenerateReport = () => {
        generatePDFReport();
      
      };

    return (
        <div className='table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
            <div className="flex flex-wrap gap-5">
                <div className="flex flex-wrap gap-5">
                    <button
                        onClick={handleGenerateReport}
                        className="p-3 bg-green-500 hover:bg-green-600 hover:opacity-95 text-white rounded-lg"
                    >
                        Generate Report
                    </button>
                    <Link to='/add-voucher'>
                    <button
                        className="p-3 bg-green-500 hover:bg-green-600 hover:opacity-95 text-white rounded-lg"
                    >
                        Add new voucher
                    </button>
                    </Link>
                </div>
            </div>
            <h1 className="pt-6 px-4 font-semibold">Current Vouchers</h1>
            { Array.isArray(vouchers) && vouchers.length > 0 ? (
                <>
                    <div className="flex ">
                        <TextInput
                            type='text'
                            placeholder='Search Voucher name, code or discount type'
                            required
                            id='title'
                            className='flex-1'
                            style={{ width: 700, marginTop: 30, marginBottom: 30, marginLeft: 250 }}
                            onChange={(e) => setSearchName(e.target.value)}
                        />
                    </div>
                    <Table hoverable className='shadow-md'>
                        <Table.Head>
                            <Table.HeadCell>Voucher Name</Table.HeadCell>
                            <Table.HeadCell>Voucher Code</Table.HeadCell>
                            <Table.HeadCell>Description</Table.HeadCell>
                            <Table.HeadCell>Discount Type</Table.HeadCell>
                            <Table.HeadCell>Discount Value</Table.HeadCell>
                            <Table.HeadCell>Is Active</Table.HeadCell>
                            <Table.HeadCell>Action</Table.HeadCell>

                        </Table.Head>
                        {vouchers.filter((voucher) => {
                            const searchQuery = searchName.toLowerCase();
                            const voucherName = voucher.voucherName.toLowerCase().includes(searchQuery);
                            const voucherCode = voucher.voucherCode.toLowerCase().includes(searchQuery);
                            const discountType = voucher.discountType.toLowerCase().includes(searchQuery);

                            // Return true if any of the search criteria match
                            return voucherName || voucherCode || discountType;
                          }).map((voucher) => (
                            <Table.Body className='divide-y' key={voucher._id}>
                                <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                                    <Table.Cell>{voucher.voucherName}</Table.Cell>
                                    <Table.Cell>{voucher.voucherCode}</Table.Cell>
                                    <Table.Cell>{voucher.description}</Table.Cell>
                                    <Table.Cell>{voucher.discountType}</Table.Cell>
                                    <Table.Cell>Rs.{voucher.discountValue}.00</Table.Cell>
                                    <Table.Cell className={voucher.isActive ? 'text-green-500' : 'text-red-500'}>
                                      {voucher.isActive ? 'Active' : 'Inactive'}
                                    </Table.Cell>
                                    <Table.Cell>
                                    <div className="flex flex-row gap-2">
                                      <Link to={`/update-voucher/${voucher._id}`}>
                                        <button><box-icon name='edit-alt' color='#65B741'></box-icon></button>
                                      </Link>
                                      
                                      <button onClick={() => {
                                                setShowModel(true);
                                                setVoucherIdToDelete(voucher._id);
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
