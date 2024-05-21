import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {clearCart} from '../redux/cart/cartSlice';
import { useNavigate , useParams} from "react-router-dom";
import { useState } from "react";

export default function PaySuccess() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { uid } = useParams();
  const [formData , setFormData] = useState({});
  const [vouchers, setvouchers] = useState([]);
 
  useEffect(() => {
    console.log(cart.cartItems);
    setvouchers(cart.cartItems)
    setFormData(vouchers)
    const myDataArray = [cart.cartItems];
  

    dispatch(clearCart());
  }, [dispatch]);
  return (
    <div>
      
      <div className="flex flex-wrap gap-32">
        <div className="px-40 flex justify-center">
            <img src="/images/logo.png" className="w-96 h-auto mt-5"/>
        </div>


        <div>
        <h1 className="pt-16 text-2xl font-semibold">Your voucher codes</h1>
        <span className="text-red-500">before close this tab note down your voucher codes</span>
          {vouchers?.map((i) => (
            <div key={i._id} className="flex flex-col mt-10 items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
              <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/images/logo.png" alt=""/>
              <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-pink-700 dark:text-white">{i.voucherName} Voucher Code</h5>
                <input type="hidden" value={i.voucherName} onChange={(e) =>
              setFormData({ ...formData, vouchername: e.target.value })
            }></input>
                <input type="hidden" value={i.voucherCode} onChange={(e) =>
              setFormData({ ...formData, code: e.target.value })
            }></input>
                <input type="hidden" value={i.discountValue*i.cartTotalQuantity} onChange={(e) =>
              setFormData({ ...formData, balance: e.target.value })
            }></input>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{i.description}</p>
                
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-700 dark:text-white">CODE:{i.voucherCode}</h5>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-700 dark:text-white">Total Balance:{i.discountValue*i.cartTotalQuantity}</h5>
                <div className="flex flex-wrap gap-52">
             
                {/* Conditionally render validity status */}
               
                </div>
              </div><br />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
