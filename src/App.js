import { HashRouter, Switch, Route, Redirect } from "react-router-dom";

import ProjectPage from "components/layouts/ProjectPage";
import Homepage from "components/layouts/Homepage";




function App() {
  
    return (   
  <HashRouter>
   <Switch>
      <Route exact path="/homepage" component = {Homepage} />
      <Route exact path="/projectpage/:model"  component = {ProjectPage} />
      <Redirect exact from="/" to="/homepage" />
      
    </Switch>
  </HashRouter>
 
  );
}

export default App;