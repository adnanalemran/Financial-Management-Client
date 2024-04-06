import { useContext } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import { FaArrowLeft, FaSignOutAlt, FaUser } from "react-icons/fa";
// import useAdmin from "../../Hook/useAdmin";
// import useStudent from "../../Hook/useStudent";
import { AuthContext } from "../../providers/AuthProvider";
// import AdminMenu from "./Admin/AdminMenu";
// import StudentMenu from "./Student/StudentMenu";
// import UserMenu from "./User/UserMenu";
import "./dashboard.css";

const showSuccessAlert = () => {
  Swal.fire({
    icon: "success",
    title: "Log out",
    text: "Successfully logged out",
  });
};

const Dashboard = () => {
  // const [isAdmin] = useAdmin();
  // const [isStudent] = useStudent();

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
              {/* <FaArrowLeft className=" mr-3 " /> */}
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
                <Link to="/dashboard/profile">
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
              {/* {isAdmin ? (
                <AdminMenu />
              ) : isStudent ? (
                <StudentMenu />
              ) : (
                <UserMenu />
              )} */}
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
