import axios from "axios";
import { Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Courses() {

  const [courses, setCourses] = useState([]);

    useEffect(() => {
        const fetchCourses = async () => {
          try {
            const { data } = await axios.get(
                `/api/course`
            );
            setCourses(data);
          } catch (error) {
            console.error(error);
          }
        };
    
        fetchCourses();
    }, []);

  return (
<>
<h1 className="text-6xl text-center mt-4 font-bold tracking-tight text-gray-900 dark:text-white">COURSES</h1>

    <div className="flex flex-row flex-wrap gap-5 my-8 ml-44 w-full">
      {courses.map((course, index) => (
        <div key={index} className="w-1/3 p-4">
          <Card href="#" className="max-w-full bg-white shadow-md rounded-lg overflow-hidden">
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {course.courseName}
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
              {course.courseDescription}
            </p>
            <p>Price: Rs. {course.coursePrice}.00</p>
            <p>Duration: {course.courseDuration}</p>
            <Link to="/register-courses">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full mt-4">Register</button>
            </Link>
          </Card>
    </div>
  ))}
</div>
  </>

  )
}
