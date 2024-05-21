import { useDispatch, useSelector } from "react-redux";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, signOut, updateUserFailure, updateUserStart, updateUserSuccess } from "../redux/user/userSlice";
import { Card } from "flowbite-react";
import axios from "axios";
import Swal from 'sweetalert2';
import jsPDF from "jspdf";


export default function DashProfile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser, loading } = useSelector(state => state.user);
  const [formData, setFormData] = useState({
    name: currentUser.name || "",
    email: currentUser.email || "",
    phone: currentUser.phone || "",
    password: ""
  });
  const [updateSuccess, setUpdateSuccess] = useState(null);
  const [updateUserError, setUpdateUserError] = useState(null);
  const [showModel, setShowModel] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    setFormData({
      name: currentUser.name || "",
      email: currentUser.email || "",
      phone: currentUser.phone || "",
      password: ""
    });
  }, [currentUser]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(updateUserStart());

      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        setUpdateUserError(data.message);
        setUpdateSuccess(null);
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess("User profile updated successfully");
      setUpdateUserError(null);
    } catch (error) {
      dispatch(updateUserFailure(error));
      setUpdateUserError(error.message);
      setUpdateSuccess(null);
    }
  };

  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());

      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE"
      });

      const data = await res.json();

      if (data.success === false) {
        dispatch(deleteUserFailure());
        return;
      }

      dispatch(deleteUserSuccess());
      navigate('/sign-in');
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch('/api/user/signout');
      dispatch(signOut());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };


    useEffect(() => {
        const fetchFeedback = async () => {
          try {
            const { data } = await axios.get(
                `/api/feedback?UserID=${currentUser._id}`
            );
            setFeedbacks(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchFeedback();
    }, [currentUser._id]);

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
                    setFeedbacks(prevFeedbacks => prevFeedbacks.filter(feedback => feedback._id !== id));
                    Swal.fire(
                        'Deleted!',
                        'The course has been deleted.',
                        'success'
                    );
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete the course. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        }
    });
}

  const appointmentDeleteHandle = async (id, event) => {
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
            axios.delete(`/api/appointment/${id}`)
                .then(response => {
                    console.log(response.data);
                    setAppointments(prevAppointments => prevAppointments.filter(appointment => appointment._id !== id));
                    Swal.fire(
                        'Deleted!',
                        'The profile has been deleted.',
                        'success'
                    );
                })
                .catch(error => {
                    console.error(error);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Failed to delete the profile. Please try again.',
                        icon: 'error',
                        confirmButtonText: 'OK'
                    });
                });
        }
    });
}


  useEffect(() => {
    axios.get(`/api/appointment?userID=${currentUser._id}`).then(response => {
        setAppointments(response.data);
    }).catch(error => {
        console.error(error);
    });
}, [currentUser._id]);

console.log(appointments);

// Function to generate a PDF of a specific appointment
const generateReceipt = (appointment) => {
  const doc = new jsPDF();

  const formattedDate = new Date(appointment.selectedDate).toISOString().split('T')[0];

  // You can customize this content as needed
  const content = `
      Service: ${appointment.service}\n
      Beautician: ${appointment.beautician}\n
      Date: ${formattedDate}\n
      Time: ${appointment.time}
  `;

  doc.text(content, 10, 10);
  doc.save(`Receipt-${appointment._id}.pdf`);
};

  return (

    <>
    <div className='max-w-lg mx-auto p-3 w-full'>
      <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          type='text'
          id='name'
          placeholder='Username'
          value={formData.name}
          onChange={handleChange}
          className='border rounded p-2'
        />
        <input
          type='email'
          id='email'
          placeholder='Email'
          value={formData.email}
          onChange={handleChange}
          className='border rounded p-2'
        />
        <input
          type='text'
          id='phone'
          placeholder='Mobile'
          value={formData.phone}
          onChange={handleChange}
          className='border rounded p-2'
        />
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className='border rounded p-2'
          />
          <button
            type="button"
            className="absolute top-2 right-3 focus:outline-none"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        <button
          type='submit'
          disabled={loading}
          className='bg-blue-500 text-white rounded p-2'
        >
          {loading ? 'Loading..' : 'Update Account'}
        </button>
      </form>
      <div className='text-red-500 flex justify-between mt-5'>
        <span onClick={() => setShowModel(true)} className='cursor-pointer' >
          Delete Account
        </span>
        <span onClick={handleSignOut} className='cursor-pointer'>
          Sign Out
        </span>
      </div>
      {updateSuccess && (
        <div className='mt-5 text-green-500'>{updateSuccess}</div>
      )}
      {updateUserError && (
        <div className='mt-5 text-red-500'>{updateUserError}</div>
      )}
      {showModel && (
        <div className="modal">
          <div className="modal-content">
            <div className="text-center">
              <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto" />
              <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-200">Are you sure you want to Delete your Account</h3>
            </div>
            <div className='flex justify-center gap-4'>
              <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded" onClick={handleDeleteUser}>
                Yes, I am sure
              </button>
              <button className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded" onClick={() => setShowModel(false)}>
                No, cancel
              </button>
            </div>
          </div>
        </div>
      )}

{!currentUser?.isAdmin && (
                    <div className="mt-9 w-full">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Your Appointments</h1>
                        {
                            appointments.map((appointment, index) => {
                                // Convert ISO string to Date object and format as YYYY-MM-DD
                                const formattedDate = new Date(appointment.selectedDate).toISOString().split('T')[0];
                                return (
                                    <Card key={index} href="#" className="max-w-sm mb-4">
                                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                            {appointment.service}
                                        </h5>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">
                                            <span className="font-semibold">Beautician: </span> {appointment.beautician}
                                        </p>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">
                                            <span className="font-semibold">Date: </span> {formattedDate}
                                        </p>
                                        <p className="font-normal text-gray-700 dark:text-gray-400">
                                            <span className="font-semibold">Time: </span> {appointment.time}
                                        </p>

                                        <div className="flex justify-between">
                                            <Link to={`/edit-appointment/${appointment._id}`}>
                                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                            </Link>
                                            <button onClick={() => generateReceipt(appointment)} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Receipt</button>
                                            <button onClick={(e) => appointmentDeleteHandle(appointment._id, e)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                        </div>
                                    </Card>
                                );
                            })
                        }
                    </div>
                )}

                {!currentUser?.isAdmin && (
                    <div className="mt-9 w-[40%]">
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mb-4">Your Feedbacks</h1>
                        {
                            feedbacks.map((feedback, index) => (
                                <Card key={index} href="#" className="max-w-sm mb-4">
                                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                        {feedback.Service}
                                    </h5>
                                    <p className="font-normal text-gray-700 dark:text-gray-400">
                                        {feedback.Feedback}
                                    </p>

                                    <div className="flex justify-between">
                                        <Link to={`/edit-feedback/${feedback._id}`}>
                                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Edit</button>
                                        </Link>

                                        <button onClick={(e) => deleteHandle(feedback._id, e)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">Delete</button>
                                    </div>
                                </Card>
                            ))
                        }
                    </div>
                )}
            </div>
        </>
    );
}