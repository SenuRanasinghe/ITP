import {useSelector} from 'react-redux';
import {useNavigate } from "react-router-dom";


const PayNowButton = ({item}) =>{
    const navigate = useNavigate();
    const {currentUser} = useSelector((state) =>state.user);

    const handleCheckout = async () => {
        console.log(currentUser._id);
        console.log(item);
        try {
            const res = await fetch(`/api/stripe/create-paynow`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    item,
                    userId: currentUser._id,
                }),
            });
    
            if (!res.ok) {
                throw new Error('Failed to create checkout session');
            }
    
            const data = await res.json();
    
            if (data.url) {
                window.location.href = data.url;
                //console.log(data)
                // navigate('/order-pay-success');
            }
        } catch (error) {
            console.log(error);
        }

    };
    

    return(
        <>
            <button onClick={()=>handleCheckout()} className="mt-2 bg-transparent hover:bg-pink-500 text-pink-700 font-semibold hover:text-white py-2 px-4 border border-pink-500 hover:border-transparent rounded">Pay Now</button>
        </>
    )
}

export default PayNowButton;