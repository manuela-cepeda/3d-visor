import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";
import { ViewerContext } from "context/ViewerContext";

const ViewerElementDropdown = ({elementID }) => {

  const { isolate, selectFromList, addToTable, CommentOnElement}=useContext(ViewerContext);

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

  //handle opcions
  const handleIsolate = (e) => { 
    e.preventDefault() 
		isolate(elementID);     
	}

	const handleComment = (e) => {  
    e.preventDefault()  
    CommentOnElement()
	}
    
	const handleAddToList =  async (e) => {  
    e.preventDefault() 		 
		addToTable()	
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
          selectFromList(e)
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
          onClick={handleAddToList}
        >
          Add to List 
        </a>
        <a
          href="#viewer"
          className={
            "hover:bg-gray-200  text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleComment}
        >
      Add comment
        </a>
        <a
          href="#viewer"
          className={
            "hover:bg-gray-200  text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleIsolate}
        >
       Isolate element
        </a>
      
      </div>
    </>
  );
};

export default ViewerElementDropdown;
