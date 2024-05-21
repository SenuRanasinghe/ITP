import { Card, Button, Navbar } from "flowbite-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Product() {
    const [inventories, setInventories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('All Products');

    useEffect(() => {
        const fetchInventories = async () => {
          try {
            // Include all products when the selected category is 'All Products'
            const queryParams = selectedCategory !== 'All Products' ? `?category=${encodeURIComponent(selectedCategory)}` : '';
            const { data } = await axios.get(`/api/inventory${queryParams}`);
            setInventories(data);
          } catch (error) {
            console.error(error);
          }
        };

        fetchInventories();
    }, [selectedCategory]);

    const handleCategoryClick = (category) => {
        setSelectedCategory(category);
    };

    return (
        <div>
            <h1 className="text-6xl text-center mt-4 font-bold tracking-tight text-gray-900 dark:text-white">PRODUCTS</h1>
            <nav className="bg-white dark:bg-gray-900 w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600 mt-20">
                <div className="max-w-screen-xl flex flex-wrap items-center p-4 mx-auto">
                    <div className="items-center gap-20 hidden w-full md:flex mx-auto md:w-auto md:order-1" id="navbar-sticky">
                        <ul className="flex flex-col text-center items-center gap-12 p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                            {['All Products', 'Hair Care', 'Nail Polish', 'Lotion & Treatment', 'Appliance', 'Makeup', 'Skin Care'].map((category) => (
                                <li key={category}>
                                    <button onClick={() => handleCategoryClick(category)} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                                        {category}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="flex flex-row flex-wrap gap-5 my-8 ml-44 w-full">
                {inventories.map((inventory, index) => (
                    <Card
                        key={index}
                        className="flex-auto max-w-sm"
                        imgAlt="Meaningful alt text for an image that is not purely decorative"
                        imgSrc={inventory.imageUrl}
                    >
                        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                            {inventory.name}
                        </h5>
                        <p className="font-normal text-gray-700 dark:text-gray-400">
                            {inventory.description}
                        </p>
                        <p className="text-lg font-normal text-gray-700 dark:text-gray-400">
                            Rs.{inventory.price}.00
                        </p>
                        <Link to={`/add-feedback/${inventory.name}`}>
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded">Give Feedback</button>
                        </Link>
                    </Card>
                ))}
            </div>
        </div>
    );
}
