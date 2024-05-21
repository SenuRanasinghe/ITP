import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashProfile from "../components/DashProfile";
import DashSideBar from "../components/DashSidebar";
import DashUsers from "../components/DashUsers";
import DashVouchers from "../components/DashVouchers";
import DashOrders from "../components/DashOrders";
import DashMyOrders from "../components/DashMyOrders";
import DashEmployees from "../components/DashEmployees";
import DashInventory from "../components/DashInventory";
import DashFeedback from "../components/DashFeedback";
import DashCourses from "../components/DashCourses";
import DashServices from "../components/DashServices";
import DashAppointment from "../components/DashAppointment";

export default function DashBoard() {
  const location = useLocation();
  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl)
    }
  }, [location.search]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-slate-300">
      <div className="md:w-56">
        <DashSideBar />
      </div>
      {tab === 'profile' && <DashProfile />}
      {tab === 'users' && <DashUsers />}
      {tab === 'vouchers' && <DashVouchers />}
      {tab === 'orders' && <DashOrders />}
      {tab === 'myOrders' && <DashMyOrders />}
      {tab === 'employee' && <DashEmployees />}
      {tab === 'inventory' && <DashInventory />}
      {tab === 'feedback' && <DashFeedback />}
      {tab === 'course' && <DashCourses />}
      {tab === 'service' && <DashServices />}
      {tab === 'appointment' && <DashAppointment />}
    </div>
  )
}
