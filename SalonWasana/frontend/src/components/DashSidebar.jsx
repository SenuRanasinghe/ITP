import { Sidebar } from "flowbite-react";
import { useEffect, useState } from "react";
import { HiArrowSmRight,HiOutlineUserGroup, HiUser,HiArchive } from 'react-icons/hi';
import { FaUserGroup } from "react-icons/fa6";
import {HiMiniFilm}from 'react-icons/hi2';
import { useDispatch, useSelector } from "react-redux";
import { AiFillHome } from "react-icons/ai";
import { Link, useNavigate} from "react-router-dom";
import { signOut } from "../redux/user/userSlice";
import { AiOutlineFileText } from "react-icons/ai";
import { SiGitbook } from "react-icons/si";
import { AiOutlinePicLeft } from "react-icons/ai";
import { AiFillCalendar } from "react-icons/ai";
export default function DashSideBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 

  const { currentUser } = useSelector(state => state.user);

  const [tab, setTab] = useState();

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');
    if (tabFromUrl) {
      setTab(tabFromUrl);
    }
  }, [location.search]);

 
  const handleSignOut = async () => {
    try {
      await fetch('/api/user/signout');
      dispatch(signOut());
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <Sidebar className="w-full md:w-56">
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          <Link to='/dashboard?tab=profile' key="profile">
            <Sidebar.Item 
              active={tab === 'profile'} 
              icon={HiUser} 
              labelColor='dark'
              as='div'
            >
              Profile
            </Sidebar.Item>
          </Link>
          <Link to='/dashboard?tab=myOrders' key="Myorders">
            <Sidebar.Item 
              active={tab === 'myOrders'} 
              icon={HiArchive} 
              labelColor='dark'
              as='div'
            >
              My Orders
            </Sidebar.Item>
          </Link>

          {currentUser?.isAdmin && (
            <Link to='/dashboard?tab=users' key="users">
              <Sidebar.Item
                active={tab === 'users'}
                icon={HiOutlineUserGroup}
                as='div'
              >
                Users
              </Sidebar.Item>
            </Link>
          )}
          {currentUser?.isAdmin && (
            <Link to='/dashboard?tab=vouchers' key="vouchers">
              <Sidebar.Item
                active={tab === 'vouchers'}
                icon={HiMiniFilm}
                as='div'
              >
                Vouchers
              </Sidebar.Item>
            </Link>
          )}

          {currentUser?.isAdmin && (
            <Link to='/dashboard?tab=orders' key="orders">
              <Sidebar.Item
                active={tab === 'orders'}
                icon={HiArchive}
                as='div'
              >
                Orders
              </Sidebar.Item>
            </Link>
          )}

{currentUser?.isAdmin && (
          <Link to='/dashboard?tab=employee' key="employee">
              <Sidebar.Item
                active={tab === 'employee'}
                icon={FaUserGroup}
                as='div'
              >
                Employee
              </Sidebar.Item>
            </Link>
 )}

{currentUser?.isAdmin && (
          <Link to='/dashboard?tab=inventory' key="inventory">
              <Sidebar.Item
                active={tab === 'inventory'}
                icon={AiFillHome}
                as='div'
              >
                Inventory
              </Sidebar.Item>
            </Link>
 )}

{currentUser?.isAdmin && (

          <Link to='/dashboard?tab=feedback' key="feedback">
              <Sidebar.Item
                active={tab === 'feedback'}
                icon={AiOutlineFileText}
                as='div'
              >
                Feedbacks
              </Sidebar.Item>
            </Link>
 )}

{currentUser?.isAdmin && (

          <Link to='/dashboard?tab=course' key="course">
              <Sidebar.Item
                active={tab === 'course'}
                icon={SiGitbook}
                as='div'
              >
                Course
              </Sidebar.Item>
          </Link>
 )}

{currentUser?.isAdmin && (

          <Link to='/dashboard?tab=service' key="service">
              <Sidebar.Item
                active={tab === 'service'}
                icon={AiOutlinePicLeft}
                as='div'
              >
                Services
              </Sidebar.Item>
          </Link>

 )}

{currentUser?.isAdmin && (

          <Link to='/dashboard?tab=appointment' key="appointment">
              <Sidebar.Item
                active={tab === 'appointment'}
                icon={AiFillCalendar}
                as='div'
              >
                Appointments
              </Sidebar.Item>
          </Link>
 )}

          <Sidebar.Item 
            icon={HiArrowSmRight} 
            className="cursor-pointer" 
            onClick={handleSignOut}
            key="signout"
          >
            Sign Out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
