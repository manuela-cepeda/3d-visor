import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// components
import Navbar from "components/common/Navbar.js";

// views
import Workspace from "components/views/proyectpage/Workspace";


export default function ProjectPage() {
  return (
    <>
      <div className=" md:flex  ">
      <div className="relative w-full min-h-screen bg-slate-100" >
        <Navbar />        
        <div className="px-4 md:px-10 mx-auto w-full mt-20">
          <Workspace />
          {/* <Switch>
            {/* TODOS DEBERIAN IR CON EL PARAMETRO ID OBTENIENDO DE LA BASE DE DATOS (COMO EN SETTINGS) - PENDIENTE
            <Route path="/projectpage/" exact component={Project} />
            <Route path="/projectpage/settings/:id" exact component={Settings} />            
            <Route path="/projectpage/workspace/" exact component={Workspace} />         
     
            <Redirect from="/" to="/projectpage/" />
          </Switch> */}
          {/* <Footer /> */}
        </div>
      </div>
      </div>
    </>
  );
}
