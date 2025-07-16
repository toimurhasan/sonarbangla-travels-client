import React, { use } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import Swal from "sweetalert2";

const ForgetPassword = () => {
  const { forgetPassword } = use(AuthContext);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    forgetPassword(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Please check your email",
          showConfirmButton: false,
          timer: 2000,
        });
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        Swal.fire({
          icon: "error",
          title: errorCode,
          showConfirmButton: false,
          timer: 2000,
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
            <Link to={"/login"} className="link  text-blue-700">
              Go to Login Page
            </Link>
            <button type="submit" className="btn bg-gray-600 hover:bg-gray-500 text-white mt-4">
              Reset Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
