import { useContext, useEffect, useState } from "react";
import {
  FaEdit,
  FaMoneyBill,
  FaPhone,
  FaSignOutAlt,
  FaUser,
} from "react-icons/fa";
import { Link, Navigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../Hook/useAxiosPublic";
import { AuthContext } from "../providers/AuthProvider";

import { FiDollarSign, FiFacebook, FiMail } from "react-icons/fi";
const Profile = () => {
  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Log out",
      text: "Successfully logged out",
    });
  };

  const { user, logOut } = useContext(AuthContext);
  const [dbuser, setDbuser] = useState(null);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosSecure.get(`/user/email/${user?.email}`);
        setDbuser(response.data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (user?.email) {
      fetchData();
    }
  }, [axiosSecure, user?.email]);

  const handleSignOut = async () => {
    try {
      await logOut();
      showSuccessAlert();
      Navigate(location?.state?.from ? location.state.from : "/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-base-300   p-8 rounded-lg shadow-md">
      {dbuser?.userType === "user" && (
        <h2 className="text-red-500 text-2xl p-4">
          আপনি একজন আবেদনকারী ,Student হিসেবে যুক্ত হতে কর্তৃপক্ষের সাথে যোগাযোগ
          করুন
        </h2>
      )}

      <div className="flex flex-col lg:flex-row-reverse w-full">
        <div className="w-full lg:w-1/2">
          <div className="avatar">
            <div className="w-36 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img src={dbuser?.photoURL} alt={dbuser?.displayName} />
            </div>
          </div>

          <div className="p-4 text-sm">
            <p className="mt-4 text-center text-gray-500">
              BTEB Id :
              {!user?.btebID && (
                <span className="text-red-600"> Student not registered </span>
              )}
              {dbuser?.btebID}
            </p>
            <p className="mt-4 text-center text-gray-500">
              Profile Id: {dbuser?._id}
            </p>
          </div>

          <div className="w-full flex gap-4 mx-auto items-center justify-center">
            <button
              onClick={handleSignOut}
              className="px-8 py-3 font-semibold rounded-full btn bg-slate-300 flex items-center"
            >
              <FaSignOutAlt className="mr-2" /> Log-out
            </button>

            <Link
              to={`/dashboard/EditProfile/${dbuser?._id}`}
              className="text-blue-800 font-bold"
            >
              <button className="px-8 py-3 font-semibold rounded-full btn bg-purple-500 text-white">
                <FaEdit /> Edit Profile
              </button>
            </Link>
          </div>
        </div>
        <div className="w-full lg:w-1/2 text-left mt-4 lg:ml-8 text-gray-800">
          <p className="text-2xl font-bold mb-4 text-gray-900">
            Your profile information
          </p>
          <hr className=" border-dashed border-1 border-indigo-400 p-4 my-4" />

          <div className="flex flex-col gap-2">
            <p>
              <span className="font-bold flex gap-2">
                <FaUser /> <p>Name:{dbuser?.displayName}</p>
              </span>
            </p>

            <p className="flex gap-2">
              <FaPhone />
              <a href={`tel:${dbuser?.phoneNo}`}>{dbuser?.phoneNo}</a>
            </p>

            <p className="flex gap-2">
              <FiMail /> <a href={`mailto:${dbuser?.email}`}>{dbuser?.email}</a>
            </p>
            <p className="flex gap-2">
              <FiFacebook /> Facebook:
              <a
                href={dbuser?.userData?.facebookUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {dbuser?.userData?.facebookUrl}
              </a>
            </p>

            <p>
              <span className="font-bold flex  gap-2 items-center ">
                <FaMoneyBill />
                <p>Total Buy Amount: {dbuser?.totalPurchesAmmount}</p>
              </span>
            </p>
            <p>
              <span className="font-bold flex  gap-2 items-center  ">
                <FiDollarSign /> <p>Total given: {dbuser?.totalSellPrice}</p>
              </span>
            </p>
            <p>
              <span className="font-bold flex  gap-2 items-center">
                <FiDollarSign /> <p>Total Due: {dbuser?.totalDueAmmout}</p>
              </span>
            </p>
          </div>

          <hr className=" border-dashed border-1 border-indigo-400 p-4 my-4" />
        </div>
      </div>
      <div className="flex w-full   text-left text-lg p-4">
        <div className=" lg:w-1/2 w-full   ">
          <p>
            <span className="font-bold text-blue-500">Name: </span>
            {dbuser?.userData.displayName}
          </p>
          <p>
            <span className="font-bold text-blue-500">Father Name: </span>
            {dbuser?.userData.fatherName}
          </p>
          <p>
            <span className="font-bold text-blue-500">Mother Name: </span>
            {dbuser?.userData.motherName}
          </p>
          <p>
            <span className="font-bold text-blue-500">Date Of Birth : </span>
            {dbuser?.userData.dateOfBirth}
          </p>
          <p>
            <span className="font-bold text-blue-500">
              Education Qualification :
            </span>
            {dbuser?.userData.educationQualification}
          </p>
          <p>
            <span className="font-bold text-blue-500">
              School/University name :
            </span>
            {dbuser?.userData.schoolUniversity}
          </p>
        </div>
        <div className=" lg:w-1/2 w-full">
          <p>
            <span className="font-bold text-blue-500">SSC Roll No :</span>
            {dbuser?.userData.sscRollNo}
          </p>
          <p>
            <span className="font-bold text-blue-500">SSC Reg No :</span>
            {dbuser?.userData.sscRegNo}
          </p>
          <p>
            <span className="font-bold text-blue-500">SSC Board Name :</span>
            {dbuser?.userData.SSCBoardName}
          </p>
          <p>
            <span className="font-bold text-blue-500">SSC Passing Year :</span>
            {dbuser?.userData.passingYear}
          </p>{" "}
          <p>
            <span className="font-bold text-blue-500">User Type :</span>
            {dbuser?.userType}
          </p>
          <p>
            <span className="font-bold text-blue-500">Beach No: </span>

            {dbuser?.beach}
          </p>
          <hr />
          <div className="">
          <p>
            <span className="font-bold text-green-500">Permanent Address:</span>
            {dbuser?.userData.permanentAddress}
          </p>
          <p>
            <span className="font-bold text-green-500">Present Address:</span>
            {dbuser?.userData.presentAddress}
          </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
