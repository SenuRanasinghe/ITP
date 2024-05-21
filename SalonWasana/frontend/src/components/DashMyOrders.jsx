import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Table } from 'flowbite-react';

export default function DashMyOrders() {
  const { currentUser } = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`/api/order/customer/${currentUser._id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchOrders();
    }
  }, [currentUser]);

  return (
    <div className='table-auto overflow-x-scroll mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500'>
       <h2 className='my-7 text-center font-semibold text-3xl'>My Orders</h2>

    {orders.length > 0 ? (
      <>
        <Table hoverable className='shadow-md'>
          <Table.Head>
            <Table.HeadCell>Order ID</Table.HeadCell>
            <Table.HeadCell>Voucher Name</Table.HeadCell>
            <Table.HeadCell>Quantity</Table.HeadCell>
            <Table.HeadCell>Balance</Table.HeadCell>
           
          </Table.Head>
          {orders.map((order) => (
            <Table.Body className='divide-y' key={order.paymentIntentId}>
              <Table.Row className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                <Table.Cell>
                  {order.paymentIntentId}
                </Table.Cell>
                <Table.Cell>
                  {order.Items.map((item, index) => (
                    <div key={index}>
                      <p>{item.name}</p>
                    </div>
                  ))}
                </Table.Cell>
                <Table.Cell>
                  {order.Items.map((item, index) => (
                    <div key={index}>
                      <p>{item.quantity}</p>
                    </div>
                  ))}
                </Table.Cell>
                <Table.Cell>
                  {order.Items.map((item, index) => (
                    <div key={index}>
                      <p>{item.price}</p>
                    </div>
                  ))}
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          ))}
        </Table>
      </>
    ) : (
      <p>You have no orders yet!</p>
    )}
  </div>
)}
