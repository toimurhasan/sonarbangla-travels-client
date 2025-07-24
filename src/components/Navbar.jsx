import React, { use, useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { AuthContext } from "../contexts/AuthContext";
// import ThemeToggleButton from "./ThemeToggleButton";
import ThemeSelector from "./ThemeSelector";
import { useQuery } from "@tanstack/react-query";

const fetchUserRole = async (email) => {
  const res = await fetch(`https://sonarbangla-travels.vercel.app/api/user-role?email=${email}`);
  if (!res.ok) throw new Error("Failed to fetch user role");
  const data = await res.json();
  return data.role;
};

const Navbar = () => {
  const { currentUser, signOutUser } = use(AuthContext);
  const clickHandler = () => {
    signOutUser()
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        // An error happened.
      });
  };

  // const [role, setRole] = useState();
  // useEffect(() => {
  //   fetch(`https://sonarbangla-travels.vercel.app/api/user-role?email=${currentUser?.email}`)
  //     .then((res) => res.json())
  //     .then((data) => setRole(data.role));
  // }, [currentUser]);

  const { data: role } = useQuery({
    queryKey: ["userRole", currentUser?.email],
    queryFn: () => fetchUserRole(currentUser.email),
    enabled: !!currentUser?.email, // avoids running if email is not ready
  });

  // if (isLoading) return <div>Loading...</div>;

  const links = (
    <>
      <li>
        <NavLink to={"/"}>Home</NavLink>
      </li>
      <li>
        <NavLink to={"/community"}>Community</NavLink>
      </li>
      <li>
        <NavLink to={"/about-us"}>About Us</NavLink>
      </li>
      <li>
        <NavLink to={"/trips"}>Trips</NavLink>
      </li>
    </>
  );

  return (
    <div className=" bg-base-100 shadow-md sticky top-0 z-10">
      <div className="navbar max-w-6xl mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="p-2 mr-2  border rounded-full border-gray-500 lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              {links}
            </ul>
          </div>
          <Link to="/">
            <h1 className="cursor-pointer text-xl flex  gap-2">
              <img src="/nav-logo.png" alt="logo" className="object-contain" />
              <span className="font-semibold hidden sm:block">SonarBangla Travels</span>
            </h1>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">{links}</ul>
        </div>

        {currentUser ? (
          <div className="navbar-end gap-2">
            <ThemeSelector></ThemeSelector>
            <div className="dropdown dropdown-end">
              <div tabIndex={0} className="avatar cursor-pointer">
                <div className="w-9 rounded-full  shadow-2xl  ">
                  <img src={currentUser.photoURL} />
                </div>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu bg-base-100 rounded-box w-52 p-2 shadow-sm"
              >
                <div className="px-3">
                  <h3>{currentUser.displayName}</h3>
                  <p>{currentUser?.email}</p>
                </div>
                <div className="divider mt-2 mb-0"></div>
                <li>
                  <Link to={`/dashboard/${role}`}>Dashboard</Link>
                </li>
                <li>
                  <button onClick={clickHandler}>Logout</button>
                </li>
              </ul>
            </div>
          </div>
        ) : (
          <div className="navbar-end gap-2">
            <ThemeSelector></ThemeSelector>
            <Link to={"/register"} className="btn">
              Register
            </Link>
            <Link to={"/login"} className="btn">
              Login
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
