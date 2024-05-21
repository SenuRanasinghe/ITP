import { Table } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "boxicons/css/boxicons.min.css";
import html2pdf from "html2pdf.js";

export default function DashOrders() {
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await fetch(`/api/user/getusers?searchTerm=${searchTerm}`);
        const data = await res.json();
        if (res.ok) {
          setUsers(data.users);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    if (currentUser && currentUser.isAdmin) {
      fetchAllUsers();
    }
  }, [currentUser, searchTerm]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const generatePDFReport = () => {
    const content = `
      <style>
        table {
          width: 100%;
          border-collapse: collapse;
        }
        th, td {
          padding: 8px;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        th {
          background-color: #f2f2f2;
          font-size: 14px; 
        }
        td {
          font-size: 12px; 
        }
      </style>
      <h1><b>User Details Report</b></h1>
      <br>
      <br>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Mobile</th>
          </tr>
        </thead>
        <tbody>
          ${users
            .map(
              (user) => `
            <tr>
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.phone}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    `;

    html2pdf()
      .from(content)
      .set({ margin: 1, filename: "user_report.pdf" })
      .save();
  };

  const handleGenerateReport = () => {
    generatePDFReport();
  };

  return (
    <div className="overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500 mb-5">
      <button
        onClick={handleGenerateReport}
        className="p-3 bg-green-500 hover:bg-green-600 hover:opacity-95 text-white rounded-lg mb-3"
      >
        Generate Report
      </button>
      <br/>
      <input
              type="text"
              placeholder="Search Users..."
              value={searchTerm}
              onChange={handleSearch}
              className="px-3 py-2 w-150 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 mr-2 h-10 placeholder-gray-500"
            />
     
      {Array.isArray(users) && users.length > 0 ? (
        <>
        
          <Table hoverable className="shadow-md mt-3">
            <Table.Head>
              <Table.HeadCell>User ID</Table.HeadCell>
              <Table.HeadCell>User Name</Table.HeadCell>
              <Table.HeadCell>Email</Table.HeadCell>
              <Table.HeadCell>Mobile Number</Table.HeadCell>
             
            </Table.Head>

            
            {users
              .map((user) => (
                <Table.Body className="divide-y" key={user._id}>
                  <Table.Row className="bg-white dauser-gray-700 dark:bg-gray-800">
                    <Table.Cell>{user._id}</Table.Cell>
                    <Table.Cell>{user.name}</Table.Cell>
                    <Table.Cell>{user.email}</Table.Cell>
                    <Table.Cell>{user.phone}</Table.Cell>
                  </Table.Row>
                </Table.Body>
              ))}
          </Table>
        </>
      ) : (
        <p>Have not any users yet</p>
      )}
    </div>
  );
}
