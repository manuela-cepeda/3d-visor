import React, {useCallback}  from "react";
import { createPopper } from "@popperjs/core";
import {useHistory} from 'react-router-dom';

const UserDropdown = () => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-start",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };

  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/myprojects/settings'), [history]);

  return (
    <>
      <a
        className="text-blueGray-500 block"
  
      >
        <div className="items-center flex">
          <span className="w-8 h-8 text-sm text-white bg-blueGray-200 inline-flex items-center justify-center rounded-full">
            <img
              alt="..."
              className="w-full rounded-full align-middle border-none shadow-lg"
              src={require("assets/img/perfil.png").default}
            />
          </span>
        </div>
      </a>
  
    </>
  );
};

export default UserDropdown;
