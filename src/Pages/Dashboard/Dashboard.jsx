import { useContext } from "react";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import {FaDollarSign, FaHome, FaSignOutAlt, FaUser } from "react-icons/fa";
 
import { AuthContext } from "../../providers/AuthProvider";
 
import "./dashboard.css";

const showSuccessAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Log out",
    text: "Successfully logged out",
  });
};

const Dashboard = () => {

  const location = useLocation();
  const navigate = useNavigate();
  const { user, logOut } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await logOut();
      showSuccessAlert();
      navigate(location?.state?.from ? location.state.from : "/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="lg:h-[200px]  h-[100px] bg-cover bg-center lg:relative">
        <div className=" py-4  bg-base-300 shadow-sm container mx-auto rounded-lg px-6">
          <div className="flex-1  ">
            <Link
              to="/"
              className=" flex text-lg text-gray-600 items-center   "
            >

              Financial Management Software
            </Link>
          </div>
        </div>
      </div>
      <div className="flex flex-col lg:flex-row w-full container mx-auto">
        <div className="w-full lg:w-1/5 sticky top-10">
          <div className="justify-around p-4 text-center rounded-lg lg:-mt-32 bg-base-300 w-full mx-auto flex lg:flex-col  ">
            <div className="mb-4">
              <img
                src={user?.photoURL}
                alt={user?.displayName}
                className="h-28 lg:h-44 mx-auto rounded-full aspect-square object-cover border-2 border-primary"
              />
            </div>

            <div className="space-y-2 text-center divide-y">
              <h4 className="text-lg font-bold">Name: {user?.displayName}</h4>

              <div className="flex gap-2 justify-center pt-3">
                <Link to="/profile">
                  <button
                    type="button"
                    className="py-3 font-semibold rounded-full btn bg-slate-300 flex items-center  "
                  >
                    <FaUser className="mr-0" /> Profile
                  </button>
                </Link>

                <button
                  onClick={handleSignOut}
                  className=" py-3 font-semibold rounded-full btn bg-slate-300 flex items-center"
                >
                  <FaSignOutAlt className="mr-0" /> Log-out
                </button>
              </div>
            </div>
          </div>
          <div className="justify-around      text-center rounded-lg my-8 bg-base-300 w-full mx-auto">
            <div>
              <div className="flex flex-col gap-4">
                <NavLink to="/">
                  <li className="flex p-2 gap-1 bg-gradient-to-r from-[#ba97e9] to-[#9756F5] text-white w-full items-center rounded-r-3xl hover:from-[#ac8cd6] hover:to-[#9756F5] transition-all duration-500">
                    <FaHome className="mx-4" />
                    <p className="font-medium text-lg">Dashboard</p>
                  </li>
                </NavLink>

                <NavLink to="/cost">
                  <li className="flex p-2 gap-1 bg-gradient-to-r from-[#ba97e9] to-[#9756F5] text-white w-full items-center rounded-r-3xl hover:from-[#ac8cd6] hover:to-[#9756F5] transition-all duration-500">
                    <FaDollarSign className="mx-4" />
                    <p className="font-medium text-lg">Cost Management</p>
                  </li>
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full lg:w-4/5  sticky">
          <div className="w-full justify-around lg:p-8  border-2 border-[#9756f5]  text-center rounded-lg lg:-mt-32 bg-base-300">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
