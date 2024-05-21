import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function EditService() {

  const {id} = useParams();

    const [formData, setFormData] = useState({})

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }
    const navigate = useNavigate();

    console.log(formData);

    useEffect(() => {
      const fetchServices = async () => {
          try {
              const response = await axios.get(`/api/service?serviceId=${id}`);
              setFormData(response.data[0]);
          } catch (error) {
              console.error(error);
          }
      };
      fetchServices();
  }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const response = axios.put(`/api/service/${id}`, formData)
            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Service has been updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/dashboard?tab=service');
                }
            });
            
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: 'Error!',
                text: 'Failed to update service. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

  return (
    <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
        <h1 className="text-3xl font-bold text-center  text-gray-800">Edit Service</h1>

        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Service Name" />
            </div>
            <TextInput value={formData.ServiceName} id="ServiceName"  type="text" sizing="md" onChange={handleChange}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Service Type" />
            </div>
            <TextInput value={formData.ServiceType} id="ServiceType"  type="text" sizing="md" onChange={handleChange}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Description" />
            </div>
            <TextInput value={formData.Description} id="Description" type="text" sizing="md" onChange={handleChange}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Price" />
            </div>
            <TextInput value={formData.Price} id="Price" type="text" sizing="md" onChange={handleChange}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Image" />
            </div>
            <TextInput value={formData.Image} id="Image" type="text" sizing="md" onChange={handleChange}/>
        </div>

        <div className="flex justify-between">
            <div>
                <Link to="/dashboard?tab=service">
                    <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                </Link>
            </div>
            <div>
                <button onClick={(e) => handleSubmit(e)} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Edit Service</button>
            </div>
        </div>
        
  </div>
  )
}

