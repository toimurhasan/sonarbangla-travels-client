// import { Outlet } from "react-router-dom";

import { Outlet } from "react-router";

const BasicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar */}
      <header>
        <div className="shadow-md p-4">
          <h1 className="text-xl font-bold">Tourist Guide</h1>
          {/* Add your Navbar component here */}
        </div>
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className=" text-center p-4">
        <p>© 2025 Tourist Guide. All rights reserved.</p>
        {/* Add social links here */}
      </footer>
    </div>
  );
};

export default BasicLayout;
