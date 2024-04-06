import Swal from "sweetalert2";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import { useContext, useState } from "react";

import Info from "./Info";

const Signin = () => {
  const { signIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const showSuccessAlert = () => {
    Swal.fire({
      icon: "success",
      title: "Success",
      text: "Sign in successful",
    });
  };

  const showErrorAlert = (error) => {
    Swal.fire({
      icon: "error",
      title: "Login unsuccessful",
      text: error,
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    signIn(email, password)
      .then(() => {
        showSuccessAlert();
        navigate(location?.state ? location.state : "/");
      })

      .catch((error) => {
        if (error.code === "auth/invalid-login-credentials") {
          showErrorAlert("Email or password is incorrect.");
        } else {
          showErrorAlert(error.message);
        }
      });
  };

  return (
    <div className="py-8 px-4 min-h-screen   ">
      <div className="bg-base-300 w-full shadow-xl mx-auto max-w-md p-8 pb-16 space-y-3 rounded-xl border my-5  ">
        <Link to="/">
          <Info />
          <p className="font-serif text-sm dark:text-gray-400 text-center py-2">
            Log in
          </p>
        </Link>

        <form className="space-y-6" onSubmit={handleLogin}>
          <div className="space-y-1 text-sm">
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
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </label>
          </div>

          <div className="space-y-1 text-sm">
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
                onChange={(e) => setPassword(e.target.value)}
                className="grow"
                placeholder="123456"
              />
            </label>
          </div>

          <button
            type="submit"
            className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-mono font-medium tracking-tighter text-white bg-gray-800 rounded-lg group  w-full"
          >
            <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-green-500 rounded-full group-hover:w-full group-hover:h-64"></span>
            <span className="absolute inset-0 w-full h-full -mt-1 rounded-lg opacity-30 bg-gradient-to-b from-transparent via-transparent to-gray-700"></span>
            <span className="relative">Sign In</span>
          </button>
        </form>

        <div className="flex items-center pt-4 space-x-1"></div>

        <p className="text-sm text-center sm:px-6 ">
          <Link to="/signUp" className="underline px-2 font-semibold">
            Apply as a new
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signin;
