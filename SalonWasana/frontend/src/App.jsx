import { BrowserRouter , Route , Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

import Header from "./components/Header"
import Home from "./pages/Home"
import Register from "./pages/Register";
import SignIn from "./pages/SignIn";
import DashBoard from "./pages/DashBoard";
import PrivateRoute from "./components/PrivateRoute";
import AddVoucher from "./pages/AddVoucher";
import GiftVouchers from "./pages/GiftVouchers";
import Cart from "./pages/Cart";
import PaySuccess from "./pages/PaySuccess";
import UpdateVoucher from "./pages/UpdateVoucher";
import UpdateOrder from "./pages/UpdateOrder";
import EmployeeEdite from "./pages/EmployeeEdite";
import AddEmployee from "./pages/AddEmployee";
import AddInventory from "./pages/AddInventory";
import EditInventory from "./pages/EditInventory";
import Product from "./pages/Product";
import FeedbackForm from "./pages/FeedbackForm";
import EditFeedBack from "./pages/EditFeedBack";
import Courses from "./pages/Courses";
import AddCourse from "./pages/AddCourse";
import EditCourse from "./pages/EditCourse";
import CourseRegister from "./pages/CourseRegister";
import AddService from "./pages/AddService";
import EditService from "./pages/EditService";
import Service from "./pages/Service";
import BookService from "./pages/BookService";
import EditAppointment from "./pages/EditAppointment";
import EmpSalary from "./pages/EmpSalary";
// import About from "./pages/About"
// import SignIn from "./pages/SignIn"
// import SignUp from "./pages/SignUp"
// import Footer from "./components/Footer"
// import PrivateRoute from "./components/PrivateRoute"
// import Cart from "./pages/Cart";
// import Ordersummary from "./pages/Ordersummary"
// import Checkout from "./pages/Checkout"
// import OnlyAdminPrivateRoute from "./components/OnlyAdminPrivateRoute"

export default function App() {
  return (
    <BrowserRouter>
    <ToastContainer />
      
      <>
        <Header/>
          <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/home" element={<Home/>}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/sign-in" element={<SignIn/>}/>
            <Route path="/dashboard" element={<DashBoard/>}/> 
            <Route element={<PrivateRoute/>}/>

            {
            /* <Route path="/about" element={<About/>}/>
            <Route element={<PrivateRoute/>}/>
            <Route element={<OnlyAdminPrivateRoute/>}/>
            <Route path="/cart" element={<Cart/>}/> */}

            <Route path="/add-voucher" element={<AddVoucher/>}/>
            <Route path="/giftvouchers" element={<GiftVouchers/>}/>
            <Route path="/cart" element={<Cart/>}/>
            <Route path="/pay-success" element={<PaySuccess/>}/>
            <Route path="/update-voucher/:voucherId" element={<UpdateVoucher/>}/>
            <Route path="/update-order/:orderId" element={<UpdateOrder/>}/>

            <Route path="/products" element={<Product/>}/>
            <Route path="/add-feedback/:id" element={<FeedbackForm/>}/>
            <Route path="/edit-feedback/:id" element={<EditFeedBack/>}/>


            <Route path="/edit-employee/:id" element={<EmployeeEdite/>}/>
            <Route path="/add-employee" element={<AddEmployee/>}/>
            <Route path="/employee-salary" element={<EmpSalary/>}/>


            <Route path="/add-inventory" element={<AddInventory/>}/>
            <Route path="/edit-inventory/:id" element={<EditInventory/>}/>

            <Route path="/courses" element={<Courses/>}/>
            <Route path="/add-courses" element={<AddCourse/>}/>
            <Route path="/edit-courses/:id" element={<EditCourse/>}/>
            <Route path="/register-courses" element={<CourseRegister/>}/>


            <Route path="/add-service" element={<AddService/>}/>
            <Route path="/edit-service/:id" element={<EditService/>}/>
            <Route path="/services" element={<Service/>}/>

            <Route path="/bookService" element={<BookService/>}/>
            <Route path="/edit-appointment/:id" element={<EditAppointment/>}/>





          </Routes>

      </>
    </BrowserRouter>
  )
}
