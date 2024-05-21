import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function EditFeedBack() {

    const {id} = useParams();
    const navigate = useNavigate();
    
    const { currentUser } = useSelector((state) => state.user);
    const [formData, setFormData] = useState({
        Email: "",
        Service: "",
        Feedback: "",
        ProductID: id,
        UserID: currentUser._id,
    })

    console.log(currentUser._id,id);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    console.log(formData);

    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const response = axios.put(`/api/feedback/${id}`, formData)
            console.log(response);
            window.location.href = "/dashboard?tab=profile";
            
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        const fetchFeedback = async () => {
            try {
                const response = await axios.get(`/api/feedback?feedbackId=${id}`);
                setFormData(response.data[0]);
            } catch (error) {
                console.error(error);
            }
        };
        fetchFeedback();
    }, [id]);

  return (
    <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
        <h1 className="text-3xl font-bold text-center  text-gray-800">Edit Feedback</h1>

        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Email" />
            </div>
            <TextInput value={formData.Email} id="Email" type="text" sizing="md" onChange={handleChange}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Service/Product" />
            </div>
            <TextInput value={formData.Service} id="Service" type="text" sizing="md" onChange={handleChange}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Feedback" />
            </div>
            <TextInput value={formData.Feedback} id="Feedback" type="text" sizing="md" onChange={handleChange}/>
        </div>
        
        <div className="flex justify-between">
            <div>
                <Link to="/dashboard?tab=profile">
                    <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                </Link>
            </div>
            <div>
                <button onClick={(e) => handleSubmit(e)} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Edit Feedback</button>
            </div>
        </div>
        
  </div>
  )
}
