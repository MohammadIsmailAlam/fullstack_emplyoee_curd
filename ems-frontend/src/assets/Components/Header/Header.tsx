import React from "react";

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 to-indigo-600 shadow-md py-4">
      <nav className="container mx-auto flex items-center justify-between px-4">
        <a className="text-white text-2xl font-bold tracking-wide" href="#">
          Employee Management
        </a>
        <ul className="flex space-x-6">
          <li>
            <a href="#" className="text-white hover:text-indigo-200 transition">
              Home
            </a>
          </li>
          {/* <li>
            <a href="#" className="text-white hover:text-indigo-200 transition">
              About
            </a>
          </li>
          <li>
            <a href="#" className="text-white hover:text-indigo-200 transition">
              Contact
            </a> */}
          {/* </li> */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
