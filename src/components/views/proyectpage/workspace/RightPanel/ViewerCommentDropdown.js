import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";
import { ViewerContext } from "context/ViewerContext";

const ViewerCommentDropdown = ({index }) => {

  const { deleteComment }=useContext(ViewerContext);

  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "left-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };



	const handleDelete = (e) => {  
    e.preventDefault()
    console.log(index)  
    deleteComment(index)
    setDropdownPopoverShow(false);
	}
    
	const handleResolve =  async (e) => {  
    e.preventDefault() 		 
    setDropdownPopoverShow(false);
	 }
  


  return (
    <>
      <a
        className="text-blueGray-500  hover:text-orange-500  focus:text-orange-500   px-3"
        href="#pablo"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();
         
        }}
      >
        <i className="fas fa-ellipsis-v"></i>
      </a>
      <div
        ref={popoverDropdownRef}
        className={
          (dropdownPopoverShow ? "block " : "hidden ") +
          "bg-white text-base z-50 float-left py-2 list-none text-left rounded shadow-lg min-w-48"
        }
      >
        <a
          href="#viewer"
          className={
            "hover:bg-gray-200 text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleResolve}
        >
          Resolve
        </a>
        <a
          href="#viewer"
          className={
            "hover:bg-gray-200  text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleDelete}
        >
        Delete
        </a>
        <a
          href="#viewer"
          className={
            "hover:bg-gray-200  text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          
        >
          Edit
        </a>
      
      </div>
    </>
  );
};

export default ViewerCommentDropdown;
