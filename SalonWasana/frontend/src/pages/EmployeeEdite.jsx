import axios from "axios";
import { Label, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from 'sweetalert2';


export default function EmployeeEdite() {

  const {id} = useParams();

    const [formData, setFormData] = useState({})
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.id]: e.target.value})
    }

    console.log(formData);

    useEffect(() => {
      const fetchEmployees = async () => {
          try {
              const response = await axios.get(`/api/employee?employeeId=${id}`);
              setFormData(response.data[0]);
          } catch (error) {
              console.error(error);
          }
      };
      fetchEmployees();
  }, [id]);


    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            const response = axios.put(`/api/employee/${id}`, formData)
            console.log(response);
            Swal.fire({
                title: 'Success!',
                text: 'Employee updated successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate('/dashboard?tab=employee');
                }
            });
            
        } catch (error) {
            console.error(error);
            // Optionally, handle errors using SweetAlert2 as well
            Swal.fire({
                title: 'Error!',
                text: 'Failed to add employee. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    }

  return (
    <div className="flex max-w-md flex-col gap-4 mx-auto mt-14 mb-14 p-4 rounded-md bg-slate-100 shadow-lg">
        <h1 className="text-3xl font-bold text-center  text-gray-800">Update Employee</h1>

        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Name" />
            </div>
            <TextInput value={formData.EmployeeName} id="EmployeeName" type="text"  sizing="md" onChange={handleChange} />
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Email" />
            </div>
            <TextInput value={formData.Email} id="Email" type="text" sizing="md" onChange={handleChange}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Age" />
            </div>
            <TextInput value={formData.Age} id="Age" type="text" sizing="md" onChange={handleChange}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Address" />
            </div>
            <TextInput value={formData.Address} id="Address" type="text" sizing="md" onChange={handleChange}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Contact Number" />
            </div>
            <TextInput value={formData.ContactNumber} id="ContactNumber" type="text" sizing="md" onChange={handleChange}/>
        </div>
        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="Description" />
            </div>
            <TextInput value={formData.Description} id="Description" type="text" sizing="md" onChange={handleChange}/>
        </div>

        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="EmployeeImage" />
            </div>
            <TextInput value={formData.EmployeeImage} id="EmployeeImage" type="text" sizing="md" onChange={handleChange}/>
        </div>

        <div>
            <div className="mb-2 block">
                <Label htmlFor="base" value="BasicSalary" />
            </div>
            <TextInput value={formData.BasicSalary} id="BasicSalary" type="text" sizing="md" onChange={handleChange}/>
        </div>

        <div className="flex justify-between">
            <div>
                <Link to="/dashboard?tab=employee">
                    <button className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Back</button>
                </Link>
            </div>
            <div>
                <button onClick={(e) => handleSubmit(e)} className="w-full rounded-md bg-blue-500 px-4 py-2 text-white">Update Employee</button>
            </div>
        </div>
        
  </div>
  )
}

