import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addToCart, clearCart, decreaseCart, getCartTotal, removeFromCart } from "../redux/cart/cartSlice";
import PayButton from './../components/PayButton';

export default function Cart() {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() =>{
    dispatch(getCartTotal());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (cartItem) => {
    dispatch(removeFromCart(cartItem));
  }

  const handleDecreaseCart = (cartItem) =>{
    dispatch(decreaseCart(cartItem));
  }

  const handleIncreaseCart = (cartItem) =>{
    dispatch(addToCart(cartItem));
  }

  const handleClearCart = () => {

    const confirmation = window.confirm('Are you sure want to clear the cart?');

    if(confirmation){
      dispatch(clearCart());
    }else{
      console.log("Cart is not cleared!");
    }
  }

  return (
    

    <>
      
    {cart.cartItems.length === 0 ? (
      <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto pt-10">
         <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart
              </h2>
          <p className="font-semibold text-center  ">Your cart is empty</p>
          <div className="flex justify-center mt-5 mb-10">
               <Link to="/giftvouchers">
                 <span className="rounded-full py-4 px-6 w-full max-w-[280px]  flex items-center bg-green-500 justify-center transition-all duration-500 hover:bg-green-600 text-white">
                   Start Shopping
                 </span>
               </Link>
          </div>
        </div>
        
      ) :(
        <section className="py-16 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">

              <h2 className="title font-manrope font-bold text-4xl leading-10 mb-8 text-center text-black">Shopping Cart
              </h2>
              <div className="hidden lg:grid grid-cols-2 py-6">
                  <div className="font-normal text-xl leading-8 text-gray-500">Product</div>
                  <p className="font-normal text-xl leading-8 text-gray-500 flex items-center justify-between">
                      <span className="w-full max-w-[200px] text-center">Price</span>
                      <span className="w-full max-w-[260px] text-center">Quantity</span>
                      <span className="w-full max-w-[200px] text-center">Total</span>
                  </p>
              </div>
              {cart.cartItems?.map((cartItem) => (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-2 min-[550px]:gap-6 border-t border-gray-200 py-6">
                  <div
                      className="flex items-center flex-col min-[550px]:flex-row gap-3 min-[550px]:gap-6 w-full max-xl:justify-center max-xl:max-w-xl max-xl:mx-auto">
                      <div className="img-box"><img src={"/images/logo.png"} alt="" className="xl:w-[140px]"/></div>
                      <div className="pro-data w-full max-w-sm ">
                          <h5 className="font-semibold text-xl leading-8 text-black max-[550px]:text-center">{cartItem.voucherName}
                          <p className="font-normal text-sm pb-3">{cartItem.description}</p>
                          </h5>
                          <p
                              className="font-normal text-lg leading-8 text-gray-500 my-2 min-[550px]:my-3 max-[550px]:text-center">
                              {cartItem.category}</p>
                          <h6 className="font-medium text-lg leading-8 text-green-600  max-[550px]:text-center">Rs.{cartItem.discountValue}</h6>
                      </div>
                  </div>
                  <div
                      className="flex items-center flex-col min-[550px]:flex-row w-full max-xl:max-w-xl max-xl:mx-auto gap-2">
                      <h6 className="font-manrope font-bold text-2xl leading-9 text-black w-full max-w-[176px] text-center">
                          Rs.{cartItem.discountValue}<span className="text-sm text-gray-300 ml-3 lg:hidden whitespace-nowrap"></span></h6>
                      <div className="flex items-center w-full mx-auto justify-center">

                          <button onClick={()=>handleDecreaseCart(cartItem)}
                              className="group rounded-l-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                              <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                  xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                  fill="none">
                                  <path d="M16.5 11H5.5" stroke="" strokeWidth="1.6" strokeLinecap="round" />
                                  <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                      strokeLinecap="round" />
                                  <path d="M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                      strokeLinecap="round" />
                              </svg>
                          </button>

                          <input type="text"
                              className="border-y border-gray-200 outline-none text-gray-900 font-semibold text-lg w-full max-w-[118px] min-w-[80px] placeholder:text-gray-900 py-[15px] text-center bg-transparent"
                              placeholder={cartItem.cartTotalQuantity}/>
                          <button onClick={()=>handleIncreaseCart(cartItem)}
                              className="group rounded-r-full px-6 py-[18px] border border-gray-200 flex items-center justify-center shadow-sm shadow-transparent transition-all duration-500 hover:shadow-gray-200 hover:border-gray-300 hover:bg-gray-50">
                              <svg className="stroke-gray-900 transition-all duration-500 group-hover:stroke-black"
                                  xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22"
                                  fill="none">
                                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeWidth="1.6"
                                      strokeLinecap="round" />
                                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                      strokeLinecap="round" />
                                  <path d="M11 5.5V16.5M16.5 11H5.5" stroke="" strokeOpacity="0.2" strokeWidth="1.6"
                                      strokeLinecap="round" />
                              </svg>
                          </button>
                      </div>
                      <h6
                          className="text-green-600 font-manrope font-bold text-2xl leading-9 w-full max-w-[176px] text-center">
                          Rs.{cartItem.discountValue * cartItem.cartTotalQuantity}</h6>
                  </div>
              
              </div>
                </>
              ))}
              
              <div className="bg-gray-50 rounded-xl p-6 w-full mb-8 max-lg:max-w-xl max-lg:mx-auto">
                  <div className="flex items-center justify-between w-full mb-6">
                      <p className="font-normal text-xl leading-8 text-gray-400">Sub Total</p>
                      <h6 className="font-semibold text-xl leading-8 text-green-900">Rs.{cart.cartTotalAmount}</h6>
                  </div>
                  
                  <div className="flex items-center justify-between w-full py-6">
                      <p className="font-manrope font-medium text-2xl leading-9 text-gray-900">Total</p>
                      <h6 className="font-manrope font-medium text-2xl leading-9 text-green-500">Rs.{cart.cartTotalAmount}</h6>
                  </div>
              </div>
              <div className="flex items-center flex-col sm:flex-row justify-center gap-3 mt-8">
                  <Link to=''>
                    <button onClick={() => handleClearCart()}
                      className="rounded-full py-4 px-6 w-full max-w-[280px]  flex items-center bg-green-50 justify-center transition-all duration-500 hover:bg-red-100">
                        <span className="px-2 font-semibold text-lg leading-8 text-green-600 ">Clear cart</span>
                    </button>
                  </Link>

                  <Link to='/giftvouchers'>
                    <button
                        className="rounded-full py-4 px-6 w-full max-w-[280px]  flex items-center bg-green-50 justify-center transition-all duration-500 hover:bg-green-100">
                        <span className="px-2 font-semibold text-lg leading-8 text-green-600">Continue shopping</span>
                    </button>
                  </Link>
                  <div >
                    <PayButton cartItems={cart.cartItems}/>
                    {/* <Link to='/'>
                      <button
                          className="rounded-full py-4 px-6 w-full max-w-[280px]  flex items-center bg-green-50 justify-center transition-all duration-500 hover:bg-green-100">
                          <span className="px-2 font-semibold text-lg leading-8 text-green-600">Continue Payment</span>
                          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
                              <path d="M8.25324 5.49609L13.7535 10.9963L8.25 16.4998" stroke="#4F46E5" strokeWidth="1.6"
                                  strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                      </button>
                    </Link> */}
                  </div>
              </div>
          </div>
        </section>
      )}
  
    </> 

  );
}
