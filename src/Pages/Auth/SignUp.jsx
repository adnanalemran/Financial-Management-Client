import axios from "axios";
import { updateProfile } from "firebase/auth";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosPublic from "../../Hook/useAxiosPublic";
import { AuthContext } from "../.././providers/AuthProvider";
import Info from "./Info";

const apiKey = "1ad39848438ab11b24c62874b073efd7";
const imageHostingApi = `https://api.imgbb.com/1/upload?key=${apiKey}`;

const SignUp = () => {
  const { createUser } = useContext(AuthContext);
  const axiosPublic = useAxiosPublic();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [course, setCourse] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success...",
      text: "Sign up success",
    });
  };

  const showErrorAlert = (error) => {
    let errorMessage = error;

    if (error && error.message) {
      errorMessage = error.message;
    }

    Swal.fire({
      icon: "error",
      title: "Error",
      text: errorMessage,
    });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const form = e.target;
      const formData = new FormData(form);

      const displayName = form.displayName.value;
      const photoURL = form.photoURL.files[0];

      const imageFile = { image: photoURL };
      const res = await axios.post(imageHostingApi, imageFile, {
        headers: {
          "content-type": "multipart/form-data",
        },
      });

      const result = await createUser(email, password);
      const currentUser = result.user;

      result.user.displayName = displayName;
      result.user.photoURL = res.data?.data?.display_url;

      await updateProfile(currentUser, {
        displayName: displayName,
        photoURL: res.data?.data?.display_url,
      });

      const data = {
        userData: Object.fromEntries(formData.entries()),
        displayName: displayName,
        email: email,
        photoURL: res.data?.data?.display_url,
        phoneNo: `+880${phoneNo}`,
        userType: "applied_student",
        course: course,
        gender: gender,
        totalDueAmmout: 0,
        totalPurchesAmmount: 0,
        markCollection: [],
      };

      axiosPublic.post("/user", data).then(() => {
        setLoading(false);
        showSuccessAlert();
        setPassword("");
        navigate("/");
      });
    } catch (error) {
      showErrorAlert(error.message);
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePhoneNoChange = (e) => {
    setPhoneNo(e.target.value);
  };



  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  return (
    <div>
      <div className="  px-4  min-h-screen">
        <section className="p-6  dark:bg-gray-800 dark:text-gray-50">
          <Info />
          <p className="font-serif text-sm dark:text-gray-400 text-center py-2">
            Sign up Form
          </p>
          <form
            onSubmit={handleSignUp}
            className="container bg-base-300 shadow-sm  flex flex-col mx-auto space-y-12"
          >
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
              <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="font-medium">Personal Information</p>
                <p className="text-xs">
                  Please provide your details for a smooth registration process.
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full  ">
                  <label className="input input-bordered flex items-center gap-2 ">
                    <div className="    text-gray-800">Name:</div>
                    <input
                      type="text"
                      name="displayName"
                      id="displayName"
                      className="grow"
                      required
                      placeholder="E.g. Adnan al emran  "
                    />
                  </label>
                </div>
                <div className="col-span-full sm:col-span-3">
                  <div className="space-y-1 text-sm">
                    <label className="input input-bordered flex items-center gap-2 ">
                      <div className="    text-gray-800">Formal-Photo: </div>
                      <input type="file" name="photoURL" className="grow" />
                    </label>
                  </div>
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label className="input input-bordered flex items-center gap-2 ">
                    <div className="    text-gray-800 "> Gender: </div>
                    <select
                      className="w-full p-2"
                      defaultValue=""
                      required
                      onChange={handleGenderChange}
                    >
                      <option
                        value=""
                        disabled
                        hidden
                        className="w-full text-gray-800"
                      >
                        Select your gender
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label className="input input-bordered flex items-center gap-2 ">
                    <div className="text-gray-800">Date of Birth:</div>
                    <input
                      type="date"
                      name="dateOfBirth"
                      id="dateOfBirth"
                      className="grow"
                      required
                      placeholder="Select date"
                    />
                  </label>
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label className="input input-bordered flex items-center gap-2 ">
                    <div className="text-gray-800">
                      Company name :
                    </div>
                    <input
                      type="text"
                      name=" companyName"
                      id="companyName"
                      className="grow"
                      required
                      placeholder="E.g. Bsc in CSE"
                    />
                  </label>
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label htmlFor="PhoneNo" className="block  "></label>
                  <label className="input input-bordered flex items-center gap-2">
                    +880
                    <input
                      type="text"
                      name="PhoneNo"
                      value={phoneNo}
                      onChange={handlePhoneNoChange}
                      pattern="[0-9]{10}"
                      placeholder="1917019619"
                      required
                      id="PhoneNo"
                      className="grow"
                    />
                  </label>
                </div>

                <div className="col-span-full sm:col-span-3">
                  <label className="input input-bordered flex items-center gap-2 ">
                    <div className="text-gray-800">Present Address:</div>
                    <input
                      type="text"
                      name="presentAddress"
                      id="presentAddress"
                      className="grow"
                      required
                      placeholder="E.g.Vill.- Mohuriya,P.O.Muzaffarpur Upazila.-Kendua, Dist- Netrokona, Banglades"
                    />
                  </label>
                </div>
              
              </div>
            </fieldset>

            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
              <div className="space-y-2 col-span-full lg:col-span-1">
                <p className="font-medium">Account Information</p>
                <p className="text-xs r">
                  For your convenience, save my email and password for future
                  logins.
                </p>
              </div>
              <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                <div className="col-span-full sm:col-span-3">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                      <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input
                      type="text"
                      className="grow"
                      onChange={handleEmailChange}
                      placeholder="Email"
                    />
                  </label>
                </div>
                <div className="col-span-full sm:col-span-3">
                  <label className="input input-bordered flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <input
                      type="password"
                      onChange={handlePasswordChange}
                      className="grow"
                    />
                  </label>
                </div>
                <div className="col-span-full sm:col-span-3"></div>
              </div>
            </fieldset>
            <div className="w-full flex flex-col items-end justify-end pb-4 px-4 ">

            
              <button className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group  ">
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-full group-hover:h-64"></span>
                <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
                <span className="relative">
                  {loading ? "processing..." : "Apply"}
                </span>
              </button>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
};

export default SignUp;
