import React, { use } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
// import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2";
import { saveUserInDB } from "../components/api/utils";

const Login = () => {
  const { signInUser, continueWithGoogle } = use(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  // console.log(location);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    signInUser(email, password)
      .then((result) => {
        // console.log(result);
        // update user
        saveUserInDB({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        });
        // toast.success("Login Successful.");
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        const errorCode = error.code;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorCode,
          confirmButtonText: "Try again",
        });
      });
  };
  // const {  } = use(AuthContext);
  const clickHandler = () => {
    continueWithGoogle()
      .then((result) => {
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        // console.log(user);
        saveUserInDB({
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        });
        navigate(location?.state || "/");
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;

        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorCode,
          confirmButtonText: "Try again",
        });
      });
  };
  return (
    <div className="h-[70vh] flex flex-col justify-center">
      <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
        <div className="card-body">
          <h1 className="text-2xl text-center font-semibold">Login</h1>
          <form onSubmit={handleSubmit} className="fieldset">
            <label className="label">Email</label>
            <input
              required
              name="email"
              type="email"
              className="input w-full"
              placeholder="Email"
            />
            <label className="label">Password</label>
            <input
              required
              name="password"
              type="password"
              className="input w-full"
              placeholder="Password"
            />
            <div className="flex justify-between">
              <Link to={"/register"} className="link  text-blue-700">
                Register Now
              </Link>
              <Link to={"/forget-password"} className="link  text-blue-700">
                Forget Password?
              </Link>
            </div>

            <button type="submit" className="btn bg-gray-600 hover:bg-gray-500 text-white mt-4">
              Login
            </button>
          </form>
          <div className="divider my-2">OR</div>
          <button onClick={clickHandler} className="btn btn-neutral">
            <FaGoogle />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
