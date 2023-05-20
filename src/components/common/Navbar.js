import React from "react";
import UserDropdown from "components/common/UserDropdown.js";
import { Link } from "react-router-dom/cjs/react-router-dom";


export default function Navbar() {
  // const {pathname} = useLocation();
  const frag = window.location.hash.substr(1).split('#');
  const [model, name] = frag

  return (
    <>
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-10 bg-transparent md:flex-row md:flex-nowrap md:justify-start flex items-center py-2 px-4">
        <div className="w-full mx-auto items-center flex justify-between md:flex-nowrap flex-wrap md:px-10 px-4">
          {/* Brand */}
            <Link to="/homepage" >
                <img alt="..."
                  className=" align-middle h-10 w-auto"
                  src={require("assets/img/3d-icon.png").default} />
            </Link>
       
             
        

          {/* Form */}
          <form className="md:flex hidden flex-row flex-wrap items-center lg:ml-auto mr-3">
            <div className="relative flex w-full flex-wrap items-stretch">
            {window.location.href.indexOf(`/homepage`) !== -1 && (
              <>
              <span className="z-10 h-full leading-snug font-normal absolute text-center text-blueGray-600 absolute bg-transparent rounded text-base items-center justify-center w-8 pl-3 py-3">
                <i className="fas fa-search"></i>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="border-0 px-3 py-3 placeholder-blueGray-600 text-blueGray-600 relative bg-white bg-white rounded text-sm shadow outline-none focus:outline-none focus:ring w-full pl-10"
              />
              </>)} 
            </div>
          </form>
          {/* User */}
          <ul className=" flex-col md:flex-row list-none items-center hidden md:flex">       
           
          <div className=" px-5 py-3 "> <i className="fa fa-bell" ></i> </div>
         {/*  <div className=" px-3 py-3 "> <i className="fas fa-sign-out-alt"></i> </div> */}
            <UserDropdown />
          </ul>
        </div>
      </nav>
      {/* End Navbar */}
    </>
  );
}
