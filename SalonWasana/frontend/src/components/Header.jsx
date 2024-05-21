import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const { cartTotalQuantity } = useSelector(state => state.cart);

    console.log(cartTotalQuantity);
   
    return (
        <>
            <nav className='flex flex-wrap' style={{ background: "#282828" }}>

                <div className="logocontainer">
                    <img src="/images/logo.png" alt="logo" style={{ width: '80px', height: 'auto', marginRight: '60px', marginLeft: '30px' }} />
                </div>

                <ul className='flex flex-wrap gap-8 justify-start text-white pt-7'>
                    <li className=' hover:text-blue-400'>
                        <Link to="/home">Home</Link>
                    </li>
                    <li className=' hover:text-blue-400'>
                        <Link to="/services">Services</Link>
                    </li>
                    <li className=' hover:text-blue-400'>
                        <Link to="/courses">Courses</Link>
                    </li>
                    <li className=' hover:text-blue-400'>
                        <Link to="/giftvouchers">Gift Vouchers</Link>
                    </li>
                    <li className=' hover:text-blue-400'>
                        <Link to="/products">Products</Link>
                    </li>
                    
                    {currentUser ? (
                        <div className="dropdown">
                            
                            <div className="dropdown-content">
                                <Link to={'/dashboard?tab=profile'}> {currentUser.name}</Link>
                            </div>
                        </div>
                    ) : (
                        <Link to='/sign-in'>
                            <button>
                                Sign In
                            </button>
                        </Link>
                    )}
                    {currentUser && (
                    <li className=' hover:text-blue-400'>
                        <Link to="/cart" className="relative">
                            <box-icon name='cart' color="#FFFFFF" size="xl"></box-icon>
                            <span className="absolute  left-5 bottom-5 bg-pink-400 text-black text-xs rounded-full px-1">{cartTotalQuantity}</span>
                        </Link>

                    </li>)}
                </ul>
            </nav>
        </>
    )
}
