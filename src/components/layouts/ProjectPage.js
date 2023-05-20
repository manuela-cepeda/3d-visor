import React from "react";

import Navbar from "components/common/Navbar.js";
import Workspace from "components/views/proyectpage/Workspace";


export default function ProjectPage() {
  return (
    <>
      <div className=" md:flex  ">
      <div className="relative w-full min-h-screen bg-slate-100" >
        <Navbar />        
        <div className="px-4 md:px-10 mx-auto w-full mt-20">
          <Workspace />
  
        </div>
      </div>
      </div>
    </>
  );
}
