import { BrowserRouter, Switch, Redirect } from "react-router-dom";
//routes
import PrivateRoute from "components/routes/PrivateRoute";
// layouts
import ProjectPage from "components/layouts/ProjectPage";
import Homepage from "components/layouts/Homepage";




function App() {
  
    return (   
  <BrowserRouter>
    <Switch>
      <PrivateRoute path="/homepage">
              <Homepage /> 
      </PrivateRoute>
      <PrivateRoute path="/projectpage">
              <ProjectPage /> 
      </PrivateRoute>
      <Redirect from="/*" to="/homepage" />
    </Switch>
  </BrowserRouter>
 
  );
}

export default App;