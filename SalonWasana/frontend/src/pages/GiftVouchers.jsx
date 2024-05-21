import { useGetVouchersQuery } from "../redux/voucher/voucherApi";
import { addToCart } from "../redux/cart/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
// import PayNowButton from "../components/PayNowButton";


export default function GiftVouchers() {
    const dispatch = useDispatch();
    const { data: voucherArray, error, isLoading, refetch } = useGetVouchersQuery();

    useEffect(() => {
        refetch();
      }, []); 
    
      if (isLoading) {
        return <p>Loading...</p>;
      }
      if (error) {
        return <p>Error: {error.message}</p>;
      }
    
    //   console.log(data);
    //   const voucherArray = data.vouchers;
    
      const handleAddToCart = (product) => {
        dispatch(addToCart(product));
      }

  return (
    <div>
        <h1 className='text-xl px-20 mt-10 font-semibold pb-10'>Gift  Vouchers</h1>

        <div className='px-20 flex flex-wrap justify-between gap-20 pb-10'>
        {voucherArray.map((voucher) => ( 
        <div key={voucher._id} className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
            <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src="/images/logo.png" alt=""/>
            <div className="flex flex-col justify-between p-4 leading-normal">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{voucher.voucherName}</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{voucher.description}</p>
                
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-green-700 dark:text-white">Rs.{voucher.discountValue}.00</h5>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{voucher.isActive}</p>
            <button onClick={() => handleAddToCart(voucher)} className="bg-transparent hover:bg-green-500 text-green-700 font-semibold hover:text-white py-2 px-4 border border-green-500 hover:border-transparent rounded">
                Add to cart
            </button>
              {/* <PayNowButton item={voucher} /> */}
            </div><br />
        </div>))}

        </div>
    </div>
  )
}
