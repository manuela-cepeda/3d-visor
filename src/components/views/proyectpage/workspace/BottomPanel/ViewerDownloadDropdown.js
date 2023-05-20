import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";
import { ViewerContext } from "context/ViewerContext";

const ViewerDownloadDropdown = ({xlsx, csv, txt}) => {


  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };


  return (
    <>
      <a  
        className=" px-4"     
        href="#download"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
      
        }}
      >
          <i className="fas fa-download"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white  z-50 text-sm  float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#download"
          className={
            "hover:bg-gray-200 text-sm py-2 px-4 font-normal block w-full whitespace-nowrap  text-blueGray-700"
          }
          onClick={ (e) => { 
            e.preventDefault()
            xlsx()
            closeDropdownPopover()
           }}
        >
          Download in xslx 
        </a>
        <a
          href=""
          className={
            "hover:bg-gray-200  text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={ (e) => { 
            e.preventDefault()
            csv()
            closeDropdownPopover()
           }}
        >
        Download in csv 
        </a>
        <a
          href=""
          className={
            "hover:bg-gray-200  text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={ (e) => { 
            e.preventDefault()
            txt()
            closeDropdownPopover()
           }}
        >
       Download in txt 
        </a>
      
      </div>
    </>
  );
};

export default ViewerDownloadDropdown;
