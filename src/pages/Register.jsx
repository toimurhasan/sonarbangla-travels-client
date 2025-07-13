import React, { use, useState } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const navigate = useNavigate();
  const { createUser, updateUserInfo } = use(AuthContext);

  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState(true);

  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

  const handleChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    setIsValid(passwordRegex.test(value));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    const name = form.name.value;
    const photo = form.photo.value;
    createUser(email, password)
      .then(() => {
        updateUserInfo(name, photo)
          .then(() => {
            toast.success("Register Successful");
            navigate(location?.state || "/");
          })
          .catch((error) => {
            const errorCode = error.code;
            toast.error(errorCode);
          });
      })
      .catch((error) => {
        const errorCode = error.code;
        toast.error(errorCode);
      });
  };
  return (
    <div>
      <div className="h-screen flex flex-col justify-center">
        <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <h1 className="text-2xl text-center font-semibold">Register</h1>
            <form onSubmit={handleSubmit} className="fieldset">
              <label className="label">Name</label>
              <input required name="name" type="text" className="input w-full" placeholder="Name" />
              <label className="label">Email</label>
              <input
                required
                name="email"
                type="email"
                className="input w-full"
                placeholder="Email"
              />
              <label className="label">Photo</label>
              <input
                required
                name="photo"
                type="text"
                className="input w-full"
                placeholder="Photo URL"
              />
              <label className="label">Password</label>
              <input
                onChange={handleChange}
                value={password}
                required
                name="password"
                type="password"
                className="input w-full"
                placeholder="Password"
              />
              <Link to={"/login"} className="link  text-blue-700">
                Login Now
              </Link>
              {isValid ? (
                <button type="submit" className="btn btn-neutral mt-4">
                  Register
                </button>
              ) : (
                <button disabled type="submit" className="btn btn-neutral mt-4">
                  Register
                </button>
              )}
              {!isValid && (
                <p className="text-xs text-red-600 mt-4">
                  Password must be at least 6 characters, and include both uppercase and lowercase
                  letters.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
