import React, { useContext } from "react";
import { createPopper } from "@popperjs/core";
import { ViewerContext } from "context/ViewerContext";

const ViewerLevelDropdown = ({childsID}) => {

  const { isolateChilds, selectAllChilds ,unselectAll}=useContext(ViewerContext);
 
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
		isolateChilds(childsID);     
    unselectAll()
	}

    
	const handleAddToList =  async (e) => {  
    e.preventDefault()    
		// addCategoryToTable(childIDs)	
	 }
   



  return (
    <>
      <a
        className="text-blueGray-500  hover:text-orange-500  focus:text-orange-500   px-3"
        href="#"
        ref={btnDropdownRef}
        onClick={(e) => {
          e.preventDefault();
          dropdownPopoverShow ? closeDropdownPopover() : openDropdownPopover();   
                 
          selectAllChilds(childsID)
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
          href=""
          className={
            "hover:bg-gray-200 text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleAddToList}
        >
          Add to List 
        </a>      
        <a
          href=""
          className={
            "hover:bg-gray-200  text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-blueGray-700"
          }
          onClick={handleIsolate}
        >
       Isolate category
        </a>
      
      </div>
    </>
  );
};

export default ViewerLevelDropdown;
