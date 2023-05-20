import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";
import { Redirect } from "react-router-dom";

// components
import Navbar from "components/common/Navbar.js";

//views
import Projects from "components/views/homepage/Projects";
import User from "components/views/homepage/User";


export default function HomePage() {

  
  return (
    <>
      <div className=" flex  ">
        <div className="relative min-h-screen w-full bg-slate-100 ">
          <Navbar />      
          <div className="px-4 md:px-10 mx-auto w-full my-20">
            <Switch>
                <Route path="/homepage" exact component={Projects} />
                <Route path="/homepage/user" exact component={User} />
                <Redirect from="/" to="/homepage" />
            </Switch>         
          </div>
        </div>
      </div>
    </>
  );
}
