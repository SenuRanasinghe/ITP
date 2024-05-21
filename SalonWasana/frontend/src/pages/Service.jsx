import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Service() {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchService = async () => {
          try {
            const { data } = await axios.get(
                `/api/service`
            );
            setServices(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchService();
    }, []);
  return (
    <>
        <h1 className="text-6xl text-center mt-4 font-bold tracking-tight text-gray-900 dark:text-white">SERVICES</h1>
    <div className="flex flex-row flex-wrap gap-5 my-8 ml-44 w-full">
        {
            services.map((service, index) => (                     
                <Card
                    key={index}
                    className="flex-auto max-w-sm"
                    imgAlt="Meaningful alt text for an image that is not purely decorative"
                    imgSrc={service.Image}
                >
                    <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {service.ServiceName}
                    </h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                    {service.Description}
                    </p>
                    <p className="text-lg font-normal text-gray-700 dark:text-gray-400">
                        Rs.{service.Price}.00
                    </p>

                    <Link to={`/add-feedback/${service._id}`}>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Give Feedback</button>
                    </Link>
                </Card>
            ))}
      
    </div>
    </>
  )
}
