import { useState } from "react";
import { Alert,  Label, TextInput ,Spinner} from "flowbite-react";
import { Link , useNavigate } from "react-router-dom";

export default function Register() {
    const [formData , setFormData] = useState({});
    const [error , setError] = useState(false);
    const [loading , setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false); 
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]:e.target.value.trim()});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!formData.name || !formData.email || !formData.phone || !formData.password) {
            return setError('Please Fill all Fields');
        }

        try {
            setLoading(true);
            setError(false);
            const res = await fetch('/api/user/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);
            setLoading(false);
            if(data.success === false) {
                setError(data.message);
                return;
            }
            navigate('/sign-in');
        } catch(error) {
            setLoading(false);
            setError(error.message);
        }
    };

   
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };
  return (
     
    <div className="min-h-screen mt-20" style={{backgroundImage:'url("./images/bn2.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', marginTop: '0px'}}>
    <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-20">
        {/* left */}
        <div className="flex-1 w-100 screen mt-35" >
            <div className="h-150 sm:h-96 xl:h-96 2xl:h-200">
              
            </div>
        </div>
        {/* right */}
        <div className="bg-white bg-opacity-15 p-14 rounded-lg shadow-lg backdrop-filter backdrop-blur-xl ">
        <div className="flex-1">
            <p className="text-center text-2xl font-cinzel font-semibold ">Sign Up</p>
            <form className="flex flex-col gap-4 mt-5" onSubmit={handleSubmit}>
                <div>
                    <Label value="Your username"/>
                    <TextInput type="text" placeholder="Username" id="name" onChange={handleChange}/>
                </div>
                <div>
                    <Label value="Your email"/>
                    <TextInput type="email" placeholder="name@company.com" id="email" onChange={handleChange}/>
                </div>
                <div>
                    <Label value="Your Mobile Number"/>
                    <TextInput type="text" placeholder="mobile number" id="phone" onChange={handleChange}/>
                </div>
                
                <div>
                    <Label value="Your password"/>
                    <div className="relative">
                        <TextInput type={showPassword ? "text" : "password"} placeholder="Password" id="password" onChange={handleChange}/>
                            <button type="button" className="absolute top-2 right-3 focus:outline-none" onClick={togglePasswordVisibility}>
                                {showPassword ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.818 8.818a4 4 0 0 1 0 6.364M5.636 8.818a4 4 0 0 1 0 6.364M11.998 5.996v.01" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 18.1V12a3.999 3.999 0 0 1 3.999-4 3.999 3.999 0 0 1 3.999 4v6.1c0 2.21-1.791 4-3.999 4a3.999 3.999 0 0 1-3.999-4z" />
                                    </svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15a7 7 0 01-7-7M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                )}
                            </button>

                    </div>
                </div>
                <button disabled={loading}  type="submit">
                    {loading ? (
                        <>
                            <Spinner size='sm'/>
                            <span className="pl-3">Loading</span>
                        </>
                    ) : 'Sign Up'}
                </button>
               
            </form>
            <div className="flex gap-2 text-sm mt-5 ">
                <span>Have an Account?</span>
                <Link to='/sign-in' className="text-blue-500">Sign In</Link>
            </div>
            {
                error && (
                    <Alert className="mt-5" color='failure'>
                        {error} 
                    </Alert>
                )
            }
        </div>
        </div>
    </div>
</div>
  )
}
